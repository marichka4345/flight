import {DESTINATION_FIELD_NAME} from '../constants/flight-types';
import {compareDates} from './format-time';

const isDuplicated = (flight, flightList) =>
  flightList.find(item => item.ID === flight.ID);

export const getTodayUniqueFlights = (flights, todayDate = Date.now()) => {
  const uniqueFlights = flights.reduce((res, flight) => {
    const {actual} = flight;

    const isFutureFlight = compareDates(actual, todayDate) > 0;
    const isPastFlight = compareDates(actual, todayDate) < 0;

    if (isDuplicated(flight, res) || isFutureFlight || isPastFlight) {
      return res;
    }

    return [...res, flight];
  }, []);
  return uniqueFlights;
}

/* Flight Search */

const searchByFlightNumber = (flightNumber, flights) =>
  flights.filter(flight =>
    flight.codeShareData.some(item => item.codeShare.indexOf(flightNumber) === 0)
  );

const searchByDestination = (destination, flights, flightType) => {
  const fieldName = DESTINATION_FIELD_NAME[flightType];

  return flights.filter(flight => flight[fieldName].indexOf(destination) === 0);
};

export const concatanateSearchResults = (...args) => {
  const flightNoResults = searchByFlightNumber(...args);
  const destinationResults = searchByDestination(...args);

  const modifiedDestinationResults = destinationResults.reduce((res, flight) => {
    if (isDuplicated(flight, flightNoResults)) {
      return res;
    }

    return [...res, flight];
  }, []);

  return [...flightNoResults, ...modifiedDestinationResults];
}