import './App.css';

import { FlightForm } from './components/FlightForm';
import { FlightFormData } from './types';
import { FlightTable } from './components/FlightTable';
import { flightApi } from './services/api';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useState } from 'react';

function App() {
  const { flights, addFlight, removeFlight, updateFlights } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAddFlight = async (formData: FlightFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const newFlight = await flightApi.trackFlight(formData.flightNumber);
      
      addFlight(newFlight);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add flight');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFlight = async (flightNumber: string) => {
    setError('');
    try {
      await flightApi.removeFlight(flightNumber);

      removeFlight(flightNumber);      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete flight');
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    setError('');
    try {
      const result = await flightApi.refreshAllFlights();
      
      const updatedFlights = flights.map(flight => {
        const updatedFlight = result.updatedFlights.find(f => f.flightNumber === flight.flightNumber);
        return updatedFlight || flight;
      });
      
      updateFlights(updatedFlights);
      
      if (result.errors.length > 0) {
        const errorMessages = result.errors.map(e => `${e.flightNumber}: ${e.error}`).join(', ');
        setError(`Some flights failed to refresh: ${errorMessages}`);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh flights');
    } finally {
      setIsRefreshing(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ✈️ Flight Tracker
          </h1>
          <p className="text-gray-600">
            Track your flights in real-time with live status updates
          </p>
        </div>
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-400 text-lg mr-3">⚠️</span>
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-600 text-lg font-bold ml-4"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <FlightForm onSubmit={handleAddFlight} isLoading={isLoading} />
        <FlightTable
          flights={flights}
          onDeleteFlight={handleDeleteFlight}
          onRefreshAll={handleRefreshAll}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Data is persisted locally and refreshed from multiple flight data providers.
          </p>
          <p className="mt-1">
            Flight statuses are automatically updated when you refresh.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
