import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

const user_icons = [
  "fas fa-square",
  "fas fa-circle"
]

const tasks = [
  { title: 'Submit report to team' }, 
  { title: 'Fill out form' }
]

export default class TaskList extends Component {

  render() {
    const taskList = tasks.map((task, idx) => {
      return <div className="task" key={idx}>
        <div className={user_icons[0] + " icon"}></div>
        {task.title}
      </div>
    })

    return(
        <div className="col tasklist">
            <div className="teamName">Team Blue</div>
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