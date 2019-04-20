import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import Intro from '../component/Intro.js'
import Team from '../component/Team.js'
import TaskList from '../component/TaskList.js'
import Messenger from '../component/Messenger.js'

export default class Tasks extends Component {

  render() {

    const intro = [<Intro key="intro" />]
    const team = [<Team store={this.props.store} key="team"/>]
    const tasks = [
      <div className="row" key="tasks">
        <TaskList store={this.props.store} />
        <Messenger store={this.props.store} />
      </div>
    ]

    return(
      <div className="container">
        {(this.props.store.isAuthenticated && !this.props.store.teamEdit && tasks) ||
         (this.props.store.teamEdit && team) ||
         intro}
      </div>
    )
  }
}

Tasks = observer(Tasks)