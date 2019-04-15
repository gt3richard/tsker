import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import Intro from '../component/Intro.js'

const tasks = [{ title: 'Submit report to team'}, {title: 'Fill out form'}]

export default class Tasks extends Component {

  render() {

    const taskList = tasks.map(function(task) {
      return <div className="task">{task.title}</div>
    })

    if(this.props.store.isAuthenticated) {
      return(
        <div className="container">
          <div className="row">
            <div className="col tasklist">
              <div className="teamName">Team Blue</div>
              <div className="searchBox">Search ...</div>
              <div className="taskLabel">Ordered by priority</div>
              {taskList}
              <div className="taskAdd">+ Add new task ...</div>
            </div>
            <div className="col messenger">
              <h2>Fill out form</h2>
            </div>
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