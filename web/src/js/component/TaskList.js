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
      task: '',
      edit: false
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick = (id) => {
    this.props.store.getTask(id)
  }
  
  onSearch = (event) => {
    this.props.store.filterTasks(event.target.value)
  }

  onEditToggle = (state) => {
    this.setState({edit: state})
    if(!state) {
      this.setState({task: ''})
    }
  }

  onAddEnter = (event) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      this.props.store.addTask(event.target.value)
      this.onEditToggle(false)
    } else {
      this.setState({task: event.target.value})
    }
  }

  render() {
    const taskList = this.props.store.filteredTasks.map((task, idx) => {
      return <div className="task" key={idx} onClick={() => this.onClick(task.id)}>
                <div className={user_icons[0] + " icon " + task_state_color[task.state]}></div>
                {task.title}
              </div>
          })

    const addFunction = [
      <div className="taskAdd" onClick={() => this.onEditToggle(true)}>
        <div className="fas fa-plus icon"></div>Add new task ...
      </div>
    ]

    const addBox = [
      <div className="taskAdd" onBlur={() => this.onEditToggle(false)}>
        <div className="input-group mb-3">
          <input type="text" className="form-control addBox" placeholder="Enter task name ..." value={this.state.task} onChange={this.onAddEnter} onKeyDown={this.onAddEnter}  aria-describedby="inputGroup-sizing-default" />
        </div>
      </div>
    ]

    return(
        <div className="col tasklist">
            <div className="teamName">{this.props.store.userData['team']}</div>
              <div className="input-group mb-3">
                <input type="text" className="form-control searchBox" placeholder="Search ..." onChange={this.onSearch} aria-describedby="inputGroup-sizing-default" />
              </div>
            <div className="taskLabel">Ordered by priority</div>
            {taskList}
            {this.state.edit && addBox || addFunction}
        </div>
        )
  }
}

TaskList = observer(TaskList)