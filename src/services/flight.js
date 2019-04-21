const getFlightNumber = flight => flight.codeShareData[0].codeShare;

export const getTodayUniqueFlights = (flights, todayDate = Date.now()) => {
  const uniqueFlights = flights.reduce((res, flight) => {
    const addedFlight = res.find(item => 
      getFlightNumber(item) === getFlightNumber(flight)
    );
    const isFutureFlight = new Date(flight.actual).getDate() > new Date(todayDate).getDate();
    const isPastFlight = new Date(flight.actual).getDate() < new Date(todayDate).getDate();
    if (addedFlight || isFutureFlight || isPastFlight) {
      return res;
    }

    return [...res, flight];
  }, []);
  return uniqueFlights;
}