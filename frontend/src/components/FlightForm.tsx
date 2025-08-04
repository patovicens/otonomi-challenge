import React, { useState } from 'react';

import { FlightFormData } from '../types';

interface FlightFormProps {
  onSubmit: (data: FlightFormData) => void;
  isLoading: boolean;
}

export const FlightForm: React.FC<FlightFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FlightFormData>({
    flightNumber: ''
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const flightNumber = formData.flightNumber.trim().toUpperCase();
    
    if (!flightNumber) {
      setError('Flight number is required');
      return;
    }

    if (!/^[A-Z]{2,3}\d{1,4}$/.test(flightNumber)) {
      setError('Please enter a valid flight number (e.g., AA123, UA456)');
      return;
    }

    onSubmit({ flightNumber });
    setFormData({ flightNumber: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFormData({ flightNumber: value });
    if (error) setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Track New Flight</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Flight Number
          </label>
          <input
            type="text"
            id="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            placeholder="e.g., AA123"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !formData.flightNumber.trim()}
          className={`w-full px-4 py-2 text-white font-medium rounded-md transition-colors ${
            isLoading || !formData.flightNumber.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Adding Flight...
            </span>
          ) : (
            'Track Flight'
          )}
        </button>
      </form>
    </div>
  );
}; 