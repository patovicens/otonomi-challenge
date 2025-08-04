import { formatDateTime, getStatusColor, getStatusIcon } from '../utils/dateUtils';

import { Flight } from '../types';
import React from 'react';

interface FlightTableProps {
  flights: Flight[];
  onDeleteFlight: (flightNumber: string) => void;
  onRefreshAll: () => void;
  isLoading: boolean;
  isRefreshing: boolean;
}

export const FlightTable: React.FC<FlightTableProps> = ({
  flights,
  onDeleteFlight,
  onRefreshAll,
  isLoading,
  isRefreshing
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading flights...</span>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flights tracked yet</h3>
          <p className="text-gray-600">Add a flight number above to start tracking</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Tracked Flights ({flights.length})
        </h2>
        <button
          onClick={onRefreshAll}
          disabled={isRefreshing}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isRefreshing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isRefreshing ? (
             <span className="flex items-center">
               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
               Refreshing...
             </span>
           ) : (
             '🔄 Refresh All'
           )}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departure Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Arrival Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((flight) => (
              <tr key={flight.flightNumber} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {flight.flightNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(flight.status)}`}>
                    <span className="mr-1">{getStatusIcon(flight.status)}</span>
                    {flight.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(flight.actualDepartureTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(flight.actualArrivalTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onDeleteFlight(flight.flightNumber)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Remove from tracking"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 