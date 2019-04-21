import React, {Component} from 'react';
import FlightList from './flight-list/flight-list';
import DateFilterList from './date-filter-list/date-filter-list';
import TypeFilterList from './type-filter-list/type-filter-list';
import {getDateForApi} from '../services/format-time';
import FlightSearch from './flight-search/flight-search';
import {getTodayUniqueFlights, concatanateSearchResults} from '../services/flight';
import {FLIGHTS_API} from '../constants/api-urls';
import {FLIGHT_TYPE} from '../constants/flight-types';
import styles from './App.module.css';

class App extends Component {

  state = {
    flightType: FLIGHT_TYPE.DEPARTURE,
    flightDate: Date.now(),
    searchField: '',
    searchResults: [],
    flights: []
  }

  async componentDidMount() {
    const {flights, searchResults} = await this.fetch(this.state);

    this.setState({
      flights,
      searchResults
    });
  }

  fetch = async ({flightType: changedFlightType, flightDate: changedDate}) => {
    const flightDate = changedDate || this.state.flightDate;
    const formattedFlightDate = getDateForApi(flightDate);

    const flightType = changedFlightType || this.state.flightType;

    try {
      const {body, error} = await fetch(`${FLIGHTS_API}/${formattedFlightDate}`)
        .then(response => response.json());

      if (error.code !== 200) {
        throw Error('Something went wrong');
      }

      const flights = getTodayUniqueFlights(body[flightType], flightDate);
      return {
        flights,
        searchResults: this.getSearchResults(this.state.searchField, flights, flightType),
        flightType,
        flightDate
      };  
    } catch (error) {
      console.error(error);
    }
  };

  searchFlight = searchField => {
    this.setState(({flights, flightType}) => ({
      searchField,
      searchResults: this.getSearchResults(searchField, flights, flightType)
    }));
  };

  getSearchResults = (searchField, flights, flightType) =>
    searchField === ''
      ? flights
      : concatanateSearchResults(searchField, flights, flightType);

  changeDataAfterFilter = async changedData => {
    const state = await this.fetch(changedData);
    this.setState(state);
  };

  render() {
    const {flightType, flightDate, searchResults} = this.state;

    return (
      <div className={styles.root}>
        <FlightSearch search={this.searchFlight} />

        <TypeFilterList
          change={this.changeDataAfterFilter}
          active={flightType}
        />
        <DateFilterList
          change={this.changeDataAfterFilter}
          active={flightDate}
        />

        <FlightList flightType={flightType} flights={searchResults} />
      </div>
    );
  }
}

export default App;
