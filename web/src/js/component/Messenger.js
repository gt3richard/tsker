import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

export default class Messenger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.onTaskStateChange = this.onTaskStateChange.bind(this)
    this.onMessageEnter    = this.onMessageEnter.bind(this)
    this.onDelete          = this.onDelete.bind(this)
  }

  getColor = (user_id) => {
    if(user_id === this.props.store.userId) {
      return this.props.store.userColor
    } else {
      return 'grey'
    }
  } 

  onTaskStateChange = (state) => {
    this.props.store.updateTaskState(state)
  }

  onMessageEnter = (event) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      this.props.store.addMessage(event.target.value)
      this.setState({message: ''})
    } else {
      this.setState({message: event.target.value})
    }
  }

  onDelete = (event) => {
    this.props.store.deleteTask()
  }

  render() {
    var messageMap = {}
    this.props.store.messages.map((message) => {
      var date = message.date.split(' ')[0]
      if(messageMap[date] === undefined) {
        messageMap[date] = [ message ]
      } else {
        messageMap[date].push(message)
      }
      return undefined
    })

    const messageList = Object.keys(messageMap).map((key, idx) => {
      const msgs = messageMap[key].map((msg, idx) => {
        return <div className="text" key={idx}>
          <div className={"fas fa-square " + this.getColor(msg.user_id) + " icon"}></div>
          {msg.text}
          </div>
      })
      return [
        <div className="message" key={idx}>
          <div className="date">{key}</div>
          {msgs}
        </div>
      ]
    })

    const titleView = [<div className="title" id="title" key="titleView">{this.props.store.taskTitle}</div>]
    const titleEdit = [
      <div className="title-edit" id="title" key="titleEdit">
        <div className="input-group input-group-lg mb-3">
          <input type="text" className="form-control" id="title" value={this.props.store.taskTitle} onChange={(e) => this.props.store.updateTitle(e.target.value)} aria-describedby="inputGroup-sizing-default" />
        </div>
      </div>
    ]

    const descriptionView = [<div className="description" id="description" key="descriptionView">{this.props.store.taskDescription}</div>]
    const descriptionEdit = [
      <div className="description-edit" id="description"  key="descriptionEdit">
        <div className="input-group mb-3">
          <textarea className="form-control" id="description" placeholder="Enter description ..." value={this.props.store.taskDescription} onChange={(e) => this.props.store.updateDescription(e.target.value)} aria-label="With textarea"></textarea>
        </div>
      </div>
    ]

    const taskState = [
      <div className="btn-group btn-group-toggle" data-toggle="buttons" key="taskSate">
        <label className={"btn btn-secondary btn-state completed" + (this.props.store.taskState === 'completed' && " active")} onClick={() => this.onTaskStateChange("completed")}>
          <input type="radio" name="options" id="completed"/> Completed
        </label>
        <label className={"btn btn-secondary btn-state blocked"+ (this.props.store.taskState === 'blocked' && " active")} onClick={() => this.onTaskStateChange("blocked")}>
          <input type="radio" name="options" id="blocked" /> Blocked
        </label>
      </div>
    ]

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
                {(this.props.store.edit && titleEdit) || titleView}
                {(this.props.store.edit && descriptionEdit) || descriptionView}
                {(this.props.store.edit) || (this.props.store.taskId && taskState)}
                <div className="bar"></div>
            </div>
          </div>
          <div className="row">
            <div className="col messageList">
                {messageList}
            </div>
          </div>
          <div className="row">
            <div className="col">
            {(this.props.store.edit) || (this.props.store.taskTitle && messageInput)}
            </div>
          </div>
          <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this task?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-danger" onClick={this.onDelete} data-dismiss="modal">Delete</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

Messenger = observer(Messenger)