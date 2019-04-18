import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

const user_icons = [
  "fas fa-square",
  "fas fa-circle"
]

const user_icon_color = [
  "red", "orange", "blue", "green"
]

export default class Messenger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.onTaskStateChange = this.onTaskStateChange.bind(this)
    this.onMessageEnter = this.onMessageEnter.bind(this)
  }

  onTaskStateChange = (state) => {
    console.log(state)
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

  render() {
    var messageMap = {}
    this.props.store.messages.map((message) => {
      var date = message.date.split(' ')[0]
      if(messageMap[date] === undefined) {
        messageMap[date] = [ message ]
      } else {
        messageMap[date].push(message)
      }
    })

    const messageList = Object.keys(messageMap).map((key, idx) => {

      const msgs = messageMap[key].map((msg, idx) => {
        return <div className="text" key={idx}>
          <div className={user_icons[0] + " " + user_icon_color[msg.user_id] + " icon"}></div>
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

    const taskState = [
      <div className="btn-group btn-group-toggle" data-toggle="buttons" key="taskSate">
        <label className="btn btn-secondary" onClick={() => this.onTaskStateChange("completed")}>
          <input type="radio" name="options" id="completed"/> Completed
        </label>
        <label className="btn btn-secondary" onClick={() => this.onTaskStateChange("blocked")}>
          <input type="radio" name="options" id="blocked" /> Blocked
        </label>
      </div>
    ]

    const messageInput = [
      <div className="input-group mb-3" key="messageInput">
        <input type="text" className="form-control messageBox" placeholder="Enter message ..." value={this.state.message} onChange={this.onMessageEnter} onKeyDown={this.onMessageEnter} aria-describedby="inputGroup-sizing-default" />
      </div>
    ]

    return (
      <div className="col messenger">
          <div className="row">
            <div className="col">
                <div className="title">{this.props.store.messageTitle}</div>
                <div className="description">{this.props.store.messageDescription}</div>
                {this.props.store.messageTitle && taskState}
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
            {this.props.store.messageTitle && messageInput}
            </div>
          </div>
      </div>
    )
  }
}

Messenger = observer(Messenger)