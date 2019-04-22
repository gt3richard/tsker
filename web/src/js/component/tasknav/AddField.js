import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

export default class AddField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      task: ''
    }

    this.onAddEnter = this.onAddEnter.bind(this)
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
    return(
        <div className="taskAddForm" key="taskAdd">
            <div className="input-group mb-3">
                <i className="fas fa-plus add-icon"></i>
                <input type="text" className="form-control add-input" placeholder="Add a new task ..." value={this.state.task} onChange={this.onAddEnter} onKeyDown={this.onAddEnter}  aria-describedby="inputGroup-sizing-default" />
            </div>
        </div>
    )
  }
}

AddField = observer(AddField)