import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Messenger.scss';

export default class TitleField extends Component {
    render() {
        if(this.props.store.edit) {
            return (
                <div className="title-edit" id="title" key="titleEdit">
                    <div className="input-group input-group-lg mb-3">
                    <input type="text" className="form-control" id="title" value={this.props.store.taskTitle} onChange={(e) => this.props.store.updateTitle(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="title" id="title" key="titleView">{this.props.store.taskTitle}</div>
            )
        }
    }
}

TitleField = observer(TitleField)