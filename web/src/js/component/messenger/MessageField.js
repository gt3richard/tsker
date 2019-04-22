import React, { Component } from 'react';
import {observer} from "mobx-react";
import '../../../assets/App.scss';
import '../../../assets/Messenger.scss';

export default class MessageField extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          message: ''
        }
    
        this.onMessageEnter = this.onMessageEnter.bind(this)
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
        if(this.props.store.edit || this.props.store.taskTitle) {
            return (
                <div className="input-group mb-3" key="messageInput">
                    <input type="text" className="form-control messageBox" placeholder="Enter message ..." value={this.state.message} onChange={this.onMessageEnter} onKeyDown={this.onMessageEnter} aria-describedby="inputGroup-sizing-default" />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

MessageField = observer(MessageField)