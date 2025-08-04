import { useEffect, useState } from 'react';

import { Flight } from '../types';

const STORAGE_KEY = 'tracked_flights';

export const useLocalStorage = () => {
  const [flights, setFlights] = useState<Flight[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [flights]);

  const addFlight = (flight: Flight): void => {
    setFlights(prevFlights => {
      const existingIndex = prevFlights.findIndex(f => f.flightNumber === flight.flightNumber);
      
      if (existingIndex >= 0) {
        // Update existing flight
        const updatedFlights = [...prevFlights];
        updatedFlights[existingIndex] = flight;
        return updatedFlights;
      } else {
        // Add new flight
        return [...prevFlights, flight];
      }
    });
  };

  const removeFlight = (flightNumber: string): void => {
    setFlights(prevFlights => 
      prevFlights.filter(f => f.flightNumber !== flightNumber)
    );
  };

  const updateFlights = (updatedFlights: Flight[]): void => {
    setFlights(updatedFlights);
  };

  const clearAllFlights = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFlights([]);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return {
    flights,
    addFlight,
    removeFlight,
    updateFlights,
    clearAllFlights
  };
}; 