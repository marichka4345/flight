import React, {Component} from 'react';
import axios from 'axios';
import Flight from '../flight/flight';
import {COLUMNS_CONFIG} from '../../constants/columns';
import {getDateForApi} from '../../services/format-time';
import styles from './flight-list.module.css';

const FLIGHTS_API = 'https://api.iev.aero/api/flights';

class FlighList extends Component {
  state = {flights: []};

  componentWillMount() {
    const {flightType} = this.props;

    axios.get(`${FLIGHTS_API}/${getDateForApi()}`)
      .then(({data}) => {
        if (data.error.code !== 200) {
          throw Error('Something went wrong');
        }

        const departureFlights = data.body[flightType];

        this.setState({flights: this.getTodayUniqueFlights(departureFlights)});
      })
      .catch(error => console.error(error));
  }

  getTodayUniqueFlights = flights => {
    const uniqueFlights = flights.reduce((res, flight) => {
      const addedFlight = res.find(item => 
        this.getFlightNumber(item) === this.getFlightNumber(flight)
      );
      const isFutureFlight = new Date(flight.actual).getTime() > new Date().getTime();
      if (addedFlight || isFutureFlight) {
        return res;
      }

      return [...res, flight];
    }, []);
    return uniqueFlights;
  }

  getFlightNumber = flight => flight.codeShareData[0].codeShare;

  render() {
    const {flights} = this.state;

    if (!flights.length) {
      return null;
    }

    return (
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {
              Object.entries(COLUMNS_CONFIG).map(
                ([key, title]) => <td key={key} className={styles.headerCell}>{title}</td>
              )
            }
          </tr>
        </thead>

        <tbody>
          {flights.map(flight => <Flight key={flight.ID} {...flight} />)}
        </tbody>
      </table>
    );
  }
}

export default FlighList;