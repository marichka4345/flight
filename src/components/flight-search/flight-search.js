import React, {Component} from 'react';
import styles from './flight-search.module.css';

class FlightSearch extends Component  {
  state = {
    searchValue: ''
  };

  handleInputChange = e => {
    this.setState({searchValue: e.target.value});
  };

  render() {
    const {searchValue} = this.state;
    const {search} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.title}>Search flight</div>
        <div className={styles.form}>
          <input value={searchValue} onChange={this.handleInputChange} placeholder="Destination or flight #" className={styles.input} />
          <button onClick={() => search(searchValue)} className={styles.button}>Search</button>
        </div>
      </div>
    );
  }
};

export default FlightSearch;