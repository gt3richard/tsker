import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

const user_icons = [
  "fas fa-square",
  "fas fa-circle"
]

const task_state_color = {
  "completed": "green",
  "blocked": "red",
  "": "grey"
}

export default class TaskList extends Component {
  constructor(props) {
    super(props)

    this.onClick    = this.onClick.bind(this)
  }

  onClick = (user_id, task_id) => {
    this.props.store.getTask(user_id, task_id)
  }
  
  render() {
    const taskList = this.props.store.results.map((user, uidx) => {
      return user.tasks.filter(f => !this.props.store.taskFilter || (f.title.toLowerCase().includes(this.props.store.taskFilter))).map((task, idx) => {
        return <div className="task" key={idx} onClick={() => this.onClick(user.user_id, task.id)}>
                  <div className={user_icons[0] + " icon " + task_state_color[task.state]}></div>
                  {task.title}
                </div>
            })
    })

    return(
        <div className="tasklist">
            {taskList}
        </div>
    )
  }
}

TaskList = observer(TaskList)