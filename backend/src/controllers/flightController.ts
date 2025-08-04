import { ApiResponse, TrackFlightRequest } from '../types';
import { Request, Response } from 'express';

import { FlightService } from '../services/flightService';

export class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  async trackFlight(req: Request<{}, {}, TrackFlightRequest>, res: Response<ApiResponse<any>>): Promise<void> {
    try {
      const { flightNumber } = req.body;

      if (!flightNumber || typeof flightNumber !== 'string' || flightNumber.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: 'Flight number is required and must be a non-empty string'
        });
        return;
      }

      const flight = await this.flightService.addFlightToTracking(flightNumber);
      
      res.status(201).json({
        success: true,
        data: flight
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to track flight';
      res.status(400).json({
        success: false,
        error: errorMessage
      });
    }
  }

  async getAllFlights(req: Request, res: Response<ApiResponse<any>>): Promise<void> {
    try {
      const flights = await this.flightService.getAllFlights();
      
      res.status(200).json({
        success: true,
        data: flights
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve flights';
      res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }

  async removeFlight(req: Request<{ flightNumber: string }>, res: Response<ApiResponse<any>>): Promise<void> {
    try {
      const { flightNumber } = req.params;

      if (!flightNumber || flightNumber.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: 'Flight number is required'
        });
        return;
      }

      const removed = await this.flightService.removeFlightFromTracking(flightNumber);
      
      if (!removed) {
        res.status(404).json({
          success: false,
          error: `Flight ${flightNumber} not found in tracking list`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { message: `Flight ${flightNumber} removed from tracking` }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove flight';
      res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }

  async refreshAllFlights(req: Request, res: Response<ApiResponse<any>>): Promise<void> {
    try {
      const result = await this.flightService.refreshAllFlights();
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh flights';
      res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }
} 