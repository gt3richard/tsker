import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

const stateIconMap = {
  "done": "fas fa-check done task-icon",
  "working": "fas fa-hourglass-half working task-icon",
  "not-done": "fas fa-check not-done task-icon"
}

export default class TaskView extends Component {
  constructor(props) {
      super(props);

      this.state = {
        state: "not-done",
        stateIcon: "fas fa-check not-done task-icon"
      }

      this.handleStateChange = this.handleStateChange.bind(this)
  }

  componentDidMount() {
    this.setState({ "state": this.props.state, "stateIcon": stateIconMap[this.props.state] })
  }

  handleStateChange = event => {
    const newState = this.props.store.getStates()[this.state.state]
    this.setState({ "state": newState, "stateIcon": stateIconMap[newState] }, function() {
      this.props.store.updateTaskState(this.props.id, this.state.state)
    })
  }
    
  render() {
    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3"> 
                <label type="text" className="form-control task-item" >{this.props.name}</label>
                <label type="text" className="form-control task-item" >{this.props.store.month[this.props.date]}</label>
                <div className="input-group-append" key="state">
                  <button className="btn btn-outline-dark task-mark" type="button" onClick={this.handleStateChange}>
                    <i className={this.state.stateIcon}></i>
                  </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

TaskView = observer(TaskView)