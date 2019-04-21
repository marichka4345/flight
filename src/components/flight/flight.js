import React from 'react';
import {getColumnContent} from '../../services/get-column-content';
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
  </tr>
);

export default Flight;