import React, { Component } from 'react';
import styles from './App.module.css';
import FlighList from './fligh-list/fligh-list';

class App extends Component {
  render() {
    return (
      <div className={styles.root}>
        <FlighList />
      </div>
    );
  }
}

export default App;
