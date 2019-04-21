const COMMON_COLUMNS_CONFIG = {
  term: 'Terminal',
  gateNo: 'Gate',
  status: 'Status',
  airline: 'Airline',
  flight: 'Flight'
};

export const DEPPARTURE_COLUMNS_CONFIG = {
  ...COMMON_COLUMNS_CONFIG,
  timeDepShedule: 'Local time',
  'airportToID.name_en': 'Destination',
};

export const ARRIVAL_COLUMNS_CONFIG = {
  ...COMMON_COLUMNS_CONFIG,
  timeArrShedule: 'Local time',
  'airportFromID.name_en': 'Destination',
};

export const getColumnsConfig = flightType => flightType === 'arrival'
  ? ARRIVAL_COLUMNS_CONFIG
  : DEPPARTURE_COLUMNS_CONFIG;
