import React from 'react';
import {getColumnContent} from '../../services/get-column-content';
import {FLIGHT_TYPE} from '../../constants/flight-types';
import {notifyMe} from '../../services/notification';
import styles from './flight.module.css';

const Flight = props => (
  <tr className={styles.flight}>
    {
      Object.keys(props.config).map(key => (
        <td key={key} className={styles.dataCell}>
          {getColumnContent(key, props, styles)}
        </td>
      ))
    }
    <td className={styles.taxiNotify}>{
      props.flightType === FLIGHT_TYPE.DEPARTURE
      && <span onClick={() => notifyMe(props)}>Notify</span>
    }</td>
  </tr>
);

export default Flight;