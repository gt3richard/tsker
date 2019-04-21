import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

export default class Text extends Component {

    getColor = (user_id) => {
        if(user_id === this.props.store.userId) {
          return this.props.store.userColor
        } else {
          return 'grey'
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
            return undefined
        })

        const messageList = Object.keys(messageMap).map((key, idx) => {
            const msgs = messageMap[key].map((msg, idx) => {
                return [ 
                    <div className="text" key={idx}>
                        <div className={"fas fa-square " + this.getColor(msg.user_id) + " icon"}></div>
                        {msg.text}
                    </div>
                ]
            })
                return [
                    <div className="message" key={idx}>
                        <div className="date">{key}</div>
                        {msgs}
                    </div>
                ]
            })
        
        return (
            <div className="col messageList">
              {messageList}
          </div>
        )
    }
}

Text = observer(Text)