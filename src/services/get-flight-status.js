import {formatDepartureTime} from './format-time';

export const getFlightStatus = (statusAbbreviation, additionalData) => {
  switch(statusAbbreviation) {
    case 'DP':
      return `Departured at ${formatDepartureTime(additionalData.timeTakeofFact)}`;
    case 'ON':
      return 'On time';
    case 'CX':
      return 'Cancelled';
    default:
      return 'Unknown status';
  }
};