import {formatDepartureTime} from './format-time';

export const getFlightStatus = (statusAbbreviation, additionalData) => {
  switch(statusAbbreviation) {
    case 'BD':
      return 'Boarding';
    case 'CK':
      return 'Check-in';
    case 'CX':
      return 'Cancelled';
    case 'DL':
      return 'Delayed';
    case 'DP':
      return `Departured at ${formatDepartureTime(additionalData.timeTakeofFact)}`;
    case 'FR':
      return 'In flight';
    case 'GC':
      return 'Gate closed';
    case 'LN':
      return `Landed ${formatDepartureTime(additionalData.timeLandFact)}`;
    case 'ON':
      return 'On time';
    default:
      return 'Unknown status';
  }
};