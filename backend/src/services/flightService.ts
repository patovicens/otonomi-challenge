import { Flight, FlightStatus } from '../types';
import { flightAwareProvider, flightStatsProvider } from './flightProvider';

export class FlightService {
  private trackedFlights: Map<string, Flight> = new Map();

  async addFlightToTracking(flightNumber: string): Promise<Flight> {
    const normalizedFlightNumber = flightNumber.toUpperCase().trim();
    
    if (!normalizedFlightNumber) {
      throw new Error('Flight number cannot be empty');
    }
    
    if (this.trackedFlights.has(normalizedFlightNumber)) {
      throw new Error(`Flight ${normalizedFlightNumber} is already being tracked`);
    }

    const flightData = await this.getFlightDataFromProviders(normalizedFlightNumber);
    
    const now = new Date().toISOString();
    const status = this.determineFlightStatus(flightData);

    const flight: Flight = {
      flightNumber: normalizedFlightNumber,
      status,
      actualDepartureTime: flightData.actualDepartureTime,
      actualArrivalTime: flightData.actualArrivalTime,
      createdAt: now,
      updatedAt: now
    };

    this.trackedFlights.set(normalizedFlightNumber, flight);
    return flight;
  }

  async getAllFlights(): Promise<Flight[]> {
    return Array.from(this.trackedFlights.values());
  }

  async removeFlightFromTracking(flightNumber: string): Promise<boolean> {
    const normalizedFlightNumber = flightNumber.toUpperCase().trim();
    return this.trackedFlights.delete(normalizedFlightNumber);
  }

  async refreshAllFlights(): Promise<{ updatedFlights: Flight[]; errors: Array<{ flightNumber: string; error: string }> }> {
    const updatedFlights: Flight[] = [];
    const errors: Array<{ flightNumber: string; error: string }> = [];

    const flightNumbers = Array.from(this.trackedFlights.keys());
    
    const refreshPromises = flightNumbers.map(async (flightNumber) => {
      try {
        const currentFlight = this.trackedFlights.get(flightNumber)!;
        
        if (currentFlight.status === 'ARRIVED') {
          updatedFlights.push(currentFlight);
          return;
        }
        
        const flightData = await this.getFlightDataFromProviders(flightNumber);
        const newStatus = this.determineFlightStatus(flightData);
        
        // Only update fields that should change, preserve static data
        const updatedFlight: Flight = {
          ...currentFlight,
          status: this.getUpdatedStatus(currentFlight.status, newStatus),
          actualDepartureTime: currentFlight.actualDepartureTime || flightData.actualDepartureTime,
          actualArrivalTime: currentFlight.actualArrivalTime || flightData.actualArrivalTime,
          updatedAt: new Date().toISOString()
        };

        this.trackedFlights.set(flightNumber, updatedFlight);
        updatedFlights.push(updatedFlight);
      } catch (error) {
        errors.push({
          flightNumber,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    });

    await Promise.all(refreshPromises);
    
    return { updatedFlights, errors };
  }

  private async getFlightDataFromProviders(flightNumber: string): Promise<{ actualDepartureTime: string | null; actualArrivalTime: string | null }> {
    const [flightStatsResult, flightAwareResult] = await Promise.allSettled([
      flightStatsProvider.getFlightData(flightNumber),
      flightAwareProvider.getFlightData(flightNumber)
    ]);

    // Use first successful response from either provider
    if (flightStatsResult.status === 'fulfilled' && !('error' in flightStatsResult.value)) {
      return flightStatsResult.value;
    }

    if (flightAwareResult.status === 'fulfilled' && !('error' in flightAwareResult.value)) {
      return flightAwareResult.value;
    }

    const errors = [];
    if (flightStatsResult.status === 'rejected') {
      errors.push(`FlightStats: ${flightStatsResult.reason}`);
    } else if ('error' in flightStatsResult.value) {
      errors.push(`FlightStats: ${flightStatsResult.value.error}`);
    }
    
    if (flightAwareResult.status === 'rejected') {
      errors.push(`FlightAware: ${flightAwareResult.reason}`);
    } else if ('error' in flightAwareResult.value) {
      errors.push(`FlightAware: ${flightAwareResult.value.error}`);
    }

    throw new Error(`Unable to retrieve flight data for ${flightNumber} from any provider: ${errors.join(', ')}`);
  }

  private getUpdatedStatus(currentStatus: FlightStatus, newStatus: FlightStatus): FlightStatus {
    // Status can only progress forward, never go backwards
    const statusOrder: FlightStatus[] = ['AWAITING', 'DEPARTED', 'ARRIVED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const newIndex = statusOrder.indexOf(newStatus);
    
    return newIndex > currentIndex ? newStatus : currentStatus;
  }

  private determineFlightStatus(flightData: { actualDepartureTime: string | null; actualArrivalTime: string | null }): FlightStatus {
    if (flightData.actualDepartureTime && flightData.actualArrivalTime) {
      return 'ARRIVED';
    }
    
    if (flightData.actualDepartureTime && !flightData.actualArrivalTime) {
      return 'DEPARTED';
    }
    
    return 'AWAITING';
  }

  getTrackedFlightsCount(): number {
    return this.trackedFlights.size;
  }

  clearAllFlights(): void {
    this.trackedFlights.clear();
  }
} 