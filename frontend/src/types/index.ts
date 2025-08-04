export interface Flight {
  flightNumber: string;
  status: FlightStatus;
  actualDepartureTime: string | null;
  actualArrivalTime: string | null;
  createdAt: string;
  updatedAt: string;
}

export type FlightStatus = 'AWAITING' | 'DEPARTED' | 'ARRIVED';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TrackFlightRequest {
  flightNumber: string;
}

export interface RefreshFlightsResponse {
  updatedFlights: Flight[];
  errors: Array<{ flightNumber: string; error: string }>;
}

export interface FlightFormData {
  flightNumber: string;
} 