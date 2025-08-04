import { FlightProviderResult } from '../types';

export interface ProviderConfig {
  name: string;
  flightNotFoundProbability: number;
  maintenanceProbability?: number;
  networkDelayRange: { min: number; max: number };
  flightDurationRange: { min: number; max: number };
}

export class FlightProvider {
  private config: ProviderConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
  }

  async getFlightData(flightNumber: string): Promise<FlightProviderResult> {
    await this.simulateNetworkDelay();

    if (Math.random() < this.config.flightNotFoundProbability) {
      return {
        error: `Flight ${flightNumber} not found in ${this.config.name} database`
      };
    }



    if (this.config.maintenanceProbability && Math.random() < this.config.maintenanceProbability) {
      return {
        error: `Flight ${flightNumber} is currently under maintenance - data temporarily unavailable`
      };
    }

    const now = new Date();
    
    const timeOffset = (Math.random() - 0.5) * 48 * 60 * 60 * 1000; // -24 to +24 hours
    const scheduledDeparture = new Date(now.getTime() + timeOffset);
    const flightDuration = this.config.flightDurationRange.min + Math.random() * (this.config.flightDurationRange.max - this.config.flightDurationRange.min);

    let actualDepartureTime: string | null = null;
    let actualArrivalTime: string | null = null;

    // Only set actual times if the flight has actually departed/arrived
    if (scheduledDeparture < now) {
      actualDepartureTime = scheduledDeparture.toISOString();
      
      const safeFlightDuration = Math.max(flightDuration, 0.5);
      
      const estimatedArrival = new Date(scheduledDeparture.getTime() + (safeFlightDuration * 60 * 60 * 1000));
      

      if (estimatedArrival > scheduledDeparture && estimatedArrival < now) {
        actualArrivalTime = estimatedArrival.toISOString();
      }
    }
    
    // If scheduledDeparture > now, both times remain null (AWAITING status)

    return {
      actualDepartureTime,
      actualArrivalTime
    };
  }

  private async simulateNetworkDelay(): Promise<void> {
    const delay = this.config.networkDelayRange.min + Math.random() * (this.config.networkDelayRange.max - this.config.networkDelayRange.min);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export const flightAwareProvider = new FlightProvider({
  name: 'FlightAware',
  flightNotFoundProbability: 0.05,
  networkDelayRange: { min: 100, max: 600 },
  flightDurationRange: { min: 1, max: 8 }
});

export const flightStatsProvider = new FlightProvider({
  name: 'FlightStats',
  flightNotFoundProbability: 0.03,
  maintenanceProbability: 0.05,
  networkDelayRange: { min: 50, max: 350 },
  flightDurationRange: { min: 1, max: 6 }
}); 