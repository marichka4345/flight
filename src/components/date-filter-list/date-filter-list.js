import React from 'react';
import {
    formatFilterDate,
    getYesterdayTimestamp,
    getTomorrowTimestamp
} from '../../services/format-time';
import styles from './date-filter-list.module.css';

const FILTERS = [
  {
    title: 'yesterday',
    date: getYesterdayTimestamp()
  },
  {
    title: 'today',
    date: Date.now()
  },
  {
    title: 'tomorrow',
    date: getTomorrowTimestamp()
  }
];

const DateFilterList = ({active, change}) => {
  const isActive = date => new Date(active).getDate() === new Date(date).getDate();

  return (
    <div className={styles.root}>
      {FILTERS.map(({title, date}) => (
        <div
          key={date}
          onClick={() => {change({flightDate: date})}}
          className={`${styles.filter} ${isActive(date) ? styles.active : ''}`}
        >
          <span className={styles.date}>{formatFilterDate(date)}</span>
          <span className={styles.title}>{title}</span>
        </div>
      ))}
    </div>
  )
};

export default DateFilterList;