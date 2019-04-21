import React, {PureComponent} from 'react';
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

class DateFilterList extends PureComponent  {
  
  render() {
    const {active, change} = this.props;
    
    return (
      <div className={styles.root}>
        {FILTERS.map(({title, date}) => (
          <div onClick={() => {change(date)}} className={`${styles.filter} ${new Date(active).getDate() === new Date(date).getDate() ? styles.active : ''}`}>
            <span className={styles.date}>{formatFilterDate(date)}</span>
            <span className={styles.title}>{title}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default DateFilterList;