import React, {Component} from 'react';
import styles from './type-filter-list.module.css';

const FILTERS = [{key: 'departure', title: 'Departures'}, {key: 'arrival', title: 'Arrivals'}];

class TypeFilterList extends Component {
  render() {
    const {change, active} = this.props;

    return (
      <div className={styles.root}>
        {FILTERS.map(({key, title}) => (
          <div onClick={() => change(key)} className={`${styles.filter} ${active === key ? styles.active : ''}`}>
            {title}
          </div>
        ))}
      </div>
    );
  }
}

export default TypeFilterList;