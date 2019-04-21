import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

export default class State extends Component {
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
                <div className="btn-group btn-group-toggle" data-toggle="buttons" key="taskSate">
                    <label className={"btn btn-secondary btn-state completed" + (this.props.store.taskState === 'completed' && " active")} onClick={() => this.onTaskStateChange("completed")}>
                        <input type="radio" name="options" id="completed"/> Completed
                    </label>
                    <label className={"btn btn-secondary btn-state blocked"+ (this.props.store.taskState === 'blocked' && " active")} onClick={() => this.onTaskStateChange("blocked")}>
                        <input type="radio" name="options" id="blocked" /> Blocked
                    </label>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

State = observer(State)