import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Messenger.scss';

export default class StateToggle extends Component {
    constructor(props) {
        super(props)
    
        this.onTaskStateChange = this.onTaskStateChange.bind(this)
      }

    onTaskStateChange = (state) => {
        this.props.store.updateTaskState(state)
      }

    render() {
        if(this.props.store.taskId && !this.props.store.edit) {
            return (
                <div className="btn-group btn-group-toggle" data-toggle="buttons" key="taskState">
                    <div className="row">
                        <div className="col btn-group-toggle">
                            <label className={"btn btn-secondary btn-state completed" + (this.props.store.taskState === 'completed' && " active")} onClick={() => this.onTaskStateChange("completed")}>
                                <input type="radio" name="options" id="completed"/> Completed
                            </label>
                        </div>
                        <div className="col btn-group-toggle">
                            <label className={"btn btn-secondary btn-state blocked"+ (this.props.store.taskState === 'blocked' && " active")} onClick={() => this.onTaskStateChange("blocked")}>
                                <input type="radio" name="options" id="blocked" /> Blocked
                            </label>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

StateToggle = observer(StateToggle)