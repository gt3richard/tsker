import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Messenger.scss';

import DeleteConfirmModal from './messenger/DeleteConfirmModal.js'
import TitleField from './messenger/TitleField.js'
import DescriptionField from './messenger/DescriptionField.js'
import StateToggle from './messenger/StateToggle.js'
import MessageWindow from './messenger/MessageWindow.js'
import MessageField from './messenger/MessageField.js'

export default class Messenger extends Component {
  
  render() {
    const deleteTask = [<button type="button" className="btn btn-danger btn-lg btn-block deleteButton" data-toggle="modal" data-target="#deleteModal" key="deleteButton">Delete Task</button>]
    
    return (
      <div className="col messenger">
        <div className="row">
          <div className="col">
              {this.props.store.edit && deleteTask}
              <TitleField store={this.props.store} />
              <DescriptionField store={this.props.store} />
              <StateToggle store={this.props.store} />
              <div className="bar"></div>
          </div>
        </div>
        <div className="row">
          <MessageWindow store={this.props.store} />
        </div>
        <div className="row">
          <div className="col">
            <MessageField store={this.props.store} />
          </div>
        </div>
        <DeleteConfirmModal store={this.props.store} />
      </div>
    )
  }
}

Messenger = observer(Messenger)