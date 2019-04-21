import React from 'react';
import Flight from '../flight/flight';
import {getColumnsConfig} from '../../constants/columns';
import {FLIGHT_TYPE} from '../../constants/flight-types';
import styles from './flight-list.module.css';

const FlightList = ({flights, flightType}) => {
  if (!flights || !flights.length) {
    return null;
  }

  const columnsConfig = getColumnsConfig(flightType);

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          {
            Object.entries(columnsConfig).map(
              ([key, title]) => <td key={key} className={styles.headerCell}>{title}</td>
            )
          }
          {flightType === FLIGHT_TYPE.DEPARTURE && <td />}
        </tr>
      </thead>

      <tbody>
        {
          flights.map(flight =>
            <Flight key={flight.ID} config={columnsConfig} flightType={flightType} {...flight} />
          )
        }
      </tbody>
    </table>
  );
}

export default FlightList;