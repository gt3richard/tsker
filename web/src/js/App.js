import React, { Component } from 'react';
import '../assets/App.scss';
import Authentication from "./auth/Authentication"
import Home from './Home'
import store from '../store/TaskStore';

import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

class App extends Component {

  render() {
    return (
      <div className="app" >
          <Authentication store={store}/>
          <Home store={store}/>
      </div>
    );
  }
}

export default App;
