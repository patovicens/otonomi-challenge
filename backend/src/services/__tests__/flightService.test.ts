import { FlightService } from '../flightService';
import { FlightStatus } from '../../types';

describe('FlightService', () => {
  let flightService: FlightService;

  beforeEach(() => {
    flightService = new FlightService();
  });

  afterEach(() => {
    flightService.clearAllFlights();
  });

  describe('addFlightToTracking', () => {
    it('should add a new flight to tracking', async () => {
      const flight = await flightService.addFlightToTracking('AA123');
      
      expect(flight.flightNumber).toBe('AA123');
      expect(flight.status).toBeDefined();
      expect(flight.createdAt).toBeDefined();
      expect(flight.updatedAt).toBeDefined();
      expect(flightService.getTrackedFlightsCount()).toBe(1);
    });

    it('should normalize flight number to uppercase', async () => {
      const flight = await flightService.addFlightToTracking('aa123');
      
      expect(flight.flightNumber).toBe('AA123');
    });

    it('should throw error if flight is already being tracked', async () => {
      await flightService.addFlightToTracking('AA123');
      
      await expect(flightService.addFlightToTracking('AA123')).rejects.toThrow(
        'Flight AA123 is already being tracked'
      );
    });

    it('should throw error for empty flight number', async () => {
      await expect(flightService.addFlightToTracking('')).rejects.toThrow();
    });
  });

  describe('getAllFlights', () => {
    it('should return empty array when no flights are tracked', async () => {
      const flights = await flightService.getAllFlights();
      
      expect(flights).toEqual([]);
    });

    it('should return all tracked flights', async () => {
      await flightService.addFlightToTracking('AA123');
      await flightService.addFlightToTracking('UA456');
      
      const flights = await flightService.getAllFlights();
      
      expect(flights).toHaveLength(2);
      expect(flights.map(f => f.flightNumber)).toContain('AA123');
      expect(flights.map(f => f.flightNumber)).toContain('UA456');
    });
  });

  describe('removeFlightFromTracking', () => {
    it('should remove flight from tracking', async () => {
      await flightService.addFlightToTracking('AA123');
      expect(flightService.getTrackedFlightsCount()).toBe(1);
      
      const removed = await flightService.removeFlightFromTracking('AA123');
      
      expect(removed).toBe(true);
      expect(flightService.getTrackedFlightsCount()).toBe(0);
    });

    it('should return false if flight is not being tracked', async () => {
      const removed = await flightService.removeFlightFromTracking('AA123');
      
      expect(removed).toBe(false);
    });

    it('should normalize flight number when removing', async () => {
      await flightService.addFlightToTracking('AA123');
      
      const removed = await flightService.removeFlightFromTracking('aa123');
      
      expect(removed).toBe(true);
      expect(flightService.getTrackedFlightsCount()).toBe(0);
    });
  });

  describe('refreshAllFlights', () => {
    it('should refresh all tracked flights', async () => {
      await flightService.addFlightToTracking('AA123');
      await flightService.addFlightToTracking('UA456');
      
      const result = await flightService.refreshAllFlights();
      
      expect(result.updatedFlights).toHaveLength(2);
      expect(result.errors).toHaveLength(0);
      expect(result.updatedFlights[0].updatedAt).toBeDefined();
      expect(result.updatedFlights[1].updatedAt).toBeDefined();
    });
  });

  describe('flight status determination', () => {
    it('should determine correct flight status based on times', async () => {
      const flight = await flightService.addFlightToTracking('AA123');
      
      expect(['AWAITING', 'DEPARTED', 'ARRIVED']).toContain(flight.status);
    });
  });
}); 