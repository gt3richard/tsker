import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tasks from '../components/Tasks';
import TaskBar from '../components/TaskBar';
import store from '../store/TskleyStore';


export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <TaskBar store={store} />
        <Tasks store={store} />
      </React.Fragment>
    );
  }
}
