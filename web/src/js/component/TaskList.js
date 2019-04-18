import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

const user_icons = [
  "fas fa-square",
  "fas fa-circle"
]

export default class TaskList extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick = (id) => {
    this.props.store.getTask(id)
  }

  render() {
    const taskList = this.props.store.tasks.map((task, idx) => {
      return <div className="task" key={idx} onClick={() => this.onClick(task.id)}>
                <div className={user_icons[0] + " icon"}></div>
                {task.title}
              </div>
          })

    return(
        <div className="col tasklist">
            <div className="teamName">{this.props.store.userData['team']}</div>
            <div className="input-group mb-3">
                <input type="text" className="form-control searchBox" placeholder="Search ..." aria-describedby="inputGroup-sizing-default" />
                </div>
            <div className="taskLabel">Ordered by priority</div>
            {taskList}
            <div className="taskAdd"><div className="fas fa-plus icon"></div>Add new task ...</div>
        </div>
        )
  }
}

TaskList = observer(TaskList)