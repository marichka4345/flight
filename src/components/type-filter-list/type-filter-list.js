import React from 'react';
import {FLIGHT_TYPE} from '../../constants/flight-types';
import styles from './type-filter-list.module.css';

const FILTERS = [
  {key: FLIGHT_TYPE.DEPARTURE, title: 'Departures'},
  {key: FLIGHT_TYPE.ARRIVAL, title: 'Arrivals'}
];

const TypeFilterList = ({change, active}) => (
  <div className={styles.root}>
    {FILTERS.map(({ key, title }) => (
      <div
        key={key}
        onClick={() => change({flightType: key})}
        className={`${styles.filter} ${active === key ? styles.active : ''}`}
      >
        {title}
      </div>
    ))}
  </div>
);

export default TypeFilterList;