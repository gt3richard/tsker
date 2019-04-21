import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import DeleteConfirm from './messenger/DeleteConfirm.js'
import Title from './messenger/Title.js'
import Description from './messenger/Description.js'
import State from './messenger/State.js'
import Text from './messenger/Text.js'

export default class Messenger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.onMessageEnter    = this.onMessageEnter.bind(this)
  }

  onMessageEnter = (event) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      this.props.store.addMessage(event.target.value)
      this.setState({message: ''})
    } else {
      this.setState({message: event.target.value})
    }
  }

  render() {
    const deleteTask = [<button type="button" className="btn btn-danger btn-lg btn-block deleteButton" data-toggle="modal" data-target="#deleteModal" key="deleteButton">Delete Task</button>]
    const messageInput = [
      <div className="input-group mb-3" key="messageInput">
        <input type="text" className="form-control messageBox" placeholder="Enter message ..." value={this.state.message} onChange={this.onMessageEnter} onKeyDown={this.onMessageEnter} aria-describedby="inputGroup-sizing-default" />
      </div>
    ]

    return (
      <div className="col messenger">
        <div className="row">
          <div className="col">
              {this.props.store.edit && deleteTask}
              <Title store={this.props.store} />
              <Description store={this.props.store} />
              <State store={this.props.store} />
              <div className="bar"></div>
          </div>
        </div>
        <div className="row">
          <Text store={this.props.store} />
        </div>
        <div className="row">
          <div className="col">
          {(this.props.store.edit) || (this.props.store.taskTitle && messageInput)}
          </div>
        </div>
        <DeleteConfirm store={this.props.store} />
      </div>
    )
  }
}

Messenger = observer(Messenger)