import React, {Component} from 'react';
import FlightList from './flight-list/flight-list';
import DateFilterList from './date-filter-list/date-filter-list';
import TypeFilterList from './type-filter-list/type-filter-list';
import {getDateForApi} from '../services/format-time';
import FlightSearch from './flight-search/flight-search';
import {getTodayUniqueFlights} from '../services/flight';
import styles from './App.module.css';

const FLIGHTS_API = 'https://api.iev.aero/api/flights';

class App extends Component {

  state = {
    flightType: 'departure',
    flightDate: Date.now(),
    searchField: '',
    searchResults: [],
    flights: []
  }

  componentWillMount() {
    const {flightType, flightDate} = this.state;
    const flights = this.fetchFlights(flightType, flightDate);

    this.setState({
      flights,
      searchResults: flights
    });
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
        this.setState(({searchField}) => ({
          flights,
          searchResults: this.getSearchResults(searchField, flights),
          flightType,
          flightDate: date
        }));
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

  searchByFlightNo = (searchField, flights) => {
    return flights.filter(flight => 
      flight.codeShareData.some(item => item.codeShare.indexOf(searchField) === 0)
    );
  }

  searchByDestination = (searchField, flights) => {
    const {flightType} = this.state;
    const fieldName = flightType === 'arrival' ? 'airportFromID.name_en' : 'airportToID.name_en';
    return flights.filter(flight => 
      flight[fieldName].indexOf(searchField) === 0
    );
  }

  concatanateSearchResults = (...args) => {
    const flightNoResults = this.searchByFlightNo(...args);
    const destinationResults = this.searchByDestination(...args);
    const isDuplicated = flight => flightNoResults.find(item => item.ID = flight.ID);

    const modifiedDestinationResults = destinationResults.reduce((res, flight) => {
      if (isDuplicated(flight)) {
        return res;
      }

      return [...res, flight];
    }, []);

    return [...flightNoResults, ...modifiedDestinationResults];
  }

  searchFlight = searchField => {
    this.setState(({flights}) => ({
      searchField,
      searchResults: this.getSearchResults(searchField, flights)
    }));
  };

  getSearchResults = (searchField, flights = []) => searchField === ''
    ? flights
    : this.concatanateSearchResults(searchField, flights);

  render() {
    const {flightType, flightDate, searchResults} = this.state;

    return (
      <div className={styles.root}>
        <FlightSearch search={this.searchFlight} />
        <TypeFilterList change={this.changeFlightType} active={flightType} />
        <DateFilterList change={this.changeFlightDate} active={flightDate} />

        <FlightList flightType={flightType} flights={searchResults} />
      </div>
    );
  }
}

export default App;
