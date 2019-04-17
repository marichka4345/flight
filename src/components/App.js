import React, { Component } from 'react';
import FlighList from './fligh-list/fligh-list';
import Tabs from './common/tabs/tabs';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Tabs tabNames={['departures', 'arrivals']}>
          <FlighList id="departures" flightType="departure" />
          <FlighList id="arrivals" flightType="arrival" />
        </Tabs>
      </div>
    );
  }
}

export default App;
