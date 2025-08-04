export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'AWAITING':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'DEPARTED':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'ARRIVED':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'AWAITING':
      return '⏳';
    case 'DEPARTED':
      return '✈️';
    case 'ARRIVED':
      return '✅';
    default:
      return '❓';
  }
}; 