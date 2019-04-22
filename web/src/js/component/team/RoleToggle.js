import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Team.scss';


export default class RoleToggle extends Component {
  constructor(props) {
    super(props)
    
    this.onRoleChange     = this.onRoleChange.bind(this)
  }

  onRoleChange = (role) => {
    this.props.store.userRole = role
  } 


  render() {
    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className={"btn btn-secondary" + (this.props.store.userRole === 'user' && ' active')} onClick={() => this.onRoleChange("user")}>
            <input type="radio" name="options" id="user"/> User
          </label>
          <label className={"btn btn-secondary" + (this.props.store.userRole === 'manager' && ' active') } onClick={() => this.onRoleChange("manager")}>
            <input type="radio" name="options" id="manager" /> Manager
          </label>
        </div>
    )
  }
}

RoleToggle = observer(RoleToggle)