import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import Intro from '../component/Intro.js'
import TaskList from '../component/TaskList.js'
import Messenger from '../component/Messenger.js'

export default class Tasks extends Component {
  render() {
    if(this.props.store.isAuthenticated) {
      return(
        <div className="container">
          <div className="row">
            <TaskList store={this.props.store} />
            <Messenger store={this.props.store} />
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container">
          <Intro />
        </div>
      )
    }
  }
}

Tasks = observer(Tasks)