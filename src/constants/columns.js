import {DESTINATION_FIELD_NAME, TIME_FIELD_NAME} from './flight-types';

export const getColumnsConfig = flightType => ({
  term: 'Terminal',
  gateNo: 'Gate',
  [TIME_FIELD_NAME[flightType]]: 'Local time',
  status: 'Status',
  [DESTINATION_FIELD_NAME[flightType]]: 'Destination',
  airline: 'Airline',
  flight: 'Flight'
});
