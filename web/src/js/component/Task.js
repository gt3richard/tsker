import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import TaskView from './TaskView.js'
import TaskEdit from './TaskEdit.js'

export default class Task extends Component {
  
  render() {

    if(this.props.store.edit) {
      return <TaskEdit {...this.props} />
    } else {
      return <TaskView {...this.props} />
    }
  }
}

Task = observer(Task)