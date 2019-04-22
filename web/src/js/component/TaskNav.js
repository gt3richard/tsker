import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import AddField from './tasknav/AddField.js'
import SearchField from './tasknav/SearchField.js'
import TaskList from './tasknav/TaskList.js'

export default class TaskNav extends Component {
  render() {
    return(
        <div className="col tasknav">
            <div className="teamName">{this.props.store.userTeam}</div>
            <SearchField store={this.props.store} />
            <div className="taskLabel">Ordered by priority</div>
            <TaskList store={this.props.store} />
            <AddField store={this.props.store} />
        </div>
    )
  }
}

TaskNav = observer(TaskNav)