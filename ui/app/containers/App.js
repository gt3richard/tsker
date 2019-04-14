import React, { Component } from 'react';
import Tasks from '../components/Tasks';
import store from '../store/TskleyStore';


export default class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Tasks store={store} />
      </React.Fragment>
    );
  }
}
