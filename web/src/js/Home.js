import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../assets/App.scss';
import Tasks from './page/Tasks'

class Home extends Component {

  tasks = () => {
    return <Tasks store={this.props.store} />
  }

  render() {
    return (
        <div className="App">
        <Router>
            <Route exact={true} path="/" component={this.tasks} />
        </Router>
      </div>
    );
  }
}

export default Home;
