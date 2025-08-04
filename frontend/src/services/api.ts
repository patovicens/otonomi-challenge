import { ApiResponse, Flight, RefreshFlightsResponse, TrackFlightRequest } from '../types';

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const flightApi = {
  async trackFlight(flightNumber: string): Promise<Flight> {
    const response = await api.post<ApiResponse<Flight>>('/flights/track', {
      flightNumber,
    } as TrackFlightRequest);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to track flight');
    }
    
    return response.data.data;
  },

  async getAllFlights(): Promise<Flight[]> {
    const response = await api.get<ApiResponse<Flight[]>>('/flights');
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch flights');
    }
    
    return response.data.data;
  },

  async removeFlight(flightNumber: string): Promise<void> {
    const response = await api.delete<ApiResponse<any>>(`/flights/${flightNumber}`);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to remove flight');
    }
  },

  async refreshAllFlights(): Promise<RefreshFlightsResponse> {
    const response = await api.post<ApiResponse<RefreshFlightsResponse>>('/flights/refresh');
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to refresh flights');
    }
    
    return response.data.data;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Network error occurred');
  }
);

export default api; 