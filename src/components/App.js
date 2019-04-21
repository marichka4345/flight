import React, {Component} from 'react';
import FlightList from './flight-list/flight-list';
import DateFilterList from './date-filter-list/date-filter-list';
import TypeFilterList from './type-filter-list/type-filter-list';
import {getDateForApi} from '../services/format-time';
import styles from './App.module.css';

const FLIGHTS_API = 'https://api.iev.aero/api/flights';

const getFlightNumber = flight => flight.codeShareData[0].codeShare;

const getTodayUniqueFlights = (flights, todayDate = Date.now()) => {
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
  console.log(uniqueFlights);
  return uniqueFlights;
}

class App extends Component {

  state = {
    flightType: 'departure',
    flightDate: Date.now(),
    flights: []
  }

  componentWillMount() {
    this.setState(({flightType, flightDate}) => ({flights: this.fetchFlights(flightType, flightDate)}));
  }

  fetchFlights = (flightType, date) => {
    const flightDate = getDateForApi(date);

    fetch(`${FLIGHTS_API}/${flightDate}`)
      .then(response => response.json())
      .then(response => {
        if (response.error.code !== 200) {
          throw Error('Something went wrong');
        }

        const flights = getTodayUniqueFlights(response.body[flightType], date);
        console.log(flights);
        this.setState({
          flights,
          flightType,
          flightDate: date
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  changeFlightType = flightType => {
    this.fetchFlights(flightType, this.state.flightDate);
  };

  changeFlightDate = flightDate => {
    this.fetchFlights(this.state.flightType, flightDate);
  };

  render() {
    return (
      <div className={styles.root}>
        <TypeFilterList change={this.changeFlightType} active={this.state.flightType} />
        <DateFilterList change={this.changeFlightDate} active={this.state.flightDate} />

        <FlightList flightType={this.state.flightType} flights={this.state.flights} />
      </div>
    );
  }
}

export default App;
