export const FLIGHT_TYPE = {
  DEPARTURE: 'departure',
  ARRIVAL: 'arrival'
};

export const DESTINATION_FIELD_NAME = {
  [FLIGHT_TYPE.DEPARTURE]: 'airportToID.name_en',
  [FLIGHT_TYPE.ARRIVAL]: 'airportFromID.name_en'
};

export const TIME_FIELD_NAME = {
  [FLIGHT_TYPE.DEPARTURE]: 'timeDepShedule',
  [FLIGHT_TYPE.ARRIVAL]: 'timeArrShedule'
};