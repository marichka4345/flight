import React from 'react';
import {formatDepartureTime} from './format-time';
import {getFlightStatus} from './get-flight-status';

export const getColumnContent = (type, props, styles) => {
  const data = props[type];
  const {codeShareData} = props;

  switch (type) {
    case 'timeDepShedule': {
      return formatDepartureTime(data);
    }
    case 'status': {
      return getFlightStatus(data, props);
    }
    case 'term': {
      return (
        <div className={styles.term}>
          <span className={styles.termText}>{data}</span>
        </div>
      );
    }
    case 'airline': {
      return (
        <>
          {codeShareData.map(({airline}, key) => (
            <div key={key} className={styles.airlineName}>{airline.en.name}</div>
          ))}
        </>
      )
    }
    case 'flight': {
      return (
        <>
          {codeShareData.map(({codeShare}) => (
            <div key={codeShare}>
              {codeShare}
            </div>
          ))}
        </>
      );
    }
    default: {
      return data || '';
    }
  }
};