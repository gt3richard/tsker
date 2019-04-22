import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

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

    this.state = {
      task: ''
    }

    this.onClick    = this.onClick.bind(this)
    this.onSearch   = this.onSearch.bind(this)
    this.onAddEnter = this.onAddEnter.bind(this)
  }

  onClick = (user_id, task_id) => {
    this.props.store.getTask(user_id, task_id)
  }
  
  onSearch = (event) => {
    this.props.store.filterTasks(event.target.value)
  }

  onAddEnter = (event) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      this.props.store.addTask(event.target.value)
      this.setState({task: ''})
    } else {
      this.setState({task: event.target.value})
    }
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

    const addBox = [
      <div className="taskAddForm" key="taskAdd">
        <div className="input-group mb-3">
          <i className="fas fa-plus add-icon"></i>
          <input type="text" className="form-control add-input" placeholder="Add a new task ..." value={this.state.task} onChange={this.onAddEnter} onKeyDown={this.onAddEnter}  aria-describedby="inputGroup-sizing-default" />
        </div>
      </div>
    ]

    return(
        <div className="col tasklist">
            <div className="teamName">{this.props.store.userTeam}</div>
              <div className="input-group mb-3">
                <input type="text" className="form-control searchBox" placeholder="Search ..." onChange={this.onSearch} aria-describedby="inputGroup-sizing-default" />
              </div>
            <div className="taskLabel">Ordered by priority</div>
            {taskList}
            {addBox}
        </div>
        )
  }
}

TaskList = observer(TaskList)