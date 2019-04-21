import React, { Component } from 'react';
import {observer} from "mobx-react";
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

export default class Description extends Component {
    render() {
        if(this.props.store.edit) {
            return (
                <div className="description-edit" id="description"  key="descriptionEdit">
                    <div className="input-group mb-3">
                        <textarea className="form-control" id="description" placeholder="Enter description ..." value={this.props.store.taskDescription} onChange={(e) => this.props.store.updateDescription(e.target.value)} aria-label="With textarea"></textarea>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="description" id="description" key="descriptionView">{this.props.store.taskDescription}</div>
            )
        }
    }
}

Description = observer(Description)