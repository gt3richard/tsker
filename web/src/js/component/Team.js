import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Team.scss';

export default class Team extends Component {
  constructor(props) {
    super(props)

    this.state= {
      'code': ''
    }

    this.props.store.getUser()
  }

  onClick = (event) => {
    const code = event.target.value
    if(code.length > 0) {
      this.props.store.joinTeam(code)
    }
  }

  onRoleChange = (role) => {
    this.props.store.userRole = role
  } 

  onColorSelection = (event) => {
    this.props.store.userColor = event.target.id
  }

  render() {
    const join = [
      <div className="team-join" key="join">
        <h1 className="display-4">Join a Team</h1>
        <p className="lead">Use your team code to join a team.</p>
        <hr className="my-4" />
        <div className="input-group input-group-lg mb-3">
          <input type="text" className="form-control" id="team-code" value={this.state.code} aria-describedby="inputGroup-sizing-default" />
          <a className="btn btn-primary btn-lg" href="#" role="button">Join</a>
        </div>
      </div>
    ]

    const edit = [
      <div className="team-edit" key="join">
        <h1 className="display-4">{this.props.store.userTeam}</h1>
        <hr className="my-4" />
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className={"btn btn-secondary" + (this.props.store.userRole === 'user' && ' active')} onClick={() => this.onRoleChange("user")}>
            <input type="radio" name="options" id="user"/> User
          </label>
          <label className={"btn btn-secondary" + (this.props.store.userRole === 'manager' && ' active') } onClick={() => this.onRoleChange("manager")}>
            <input type="radio" name="options" id="manager" /> Manager
          </label>
        </div>
        <div className="color">
          <div className="row">
            <div className={"col blue-bg " + (this.props.store.userColor === 'blue' && "active")} onClick={this.onColorSelection} id="blue"></div>
            <div className={"col green-bg " + (this.props.store.userColor === 'green' && "active")} onClick={this.onColorSelection} id="green"></div>
            <div className={"col red-bg " + (this.props.store.userColor === 'red' && "active")} onClick={this.onColorSelection} id="red"></div>
            <div className={"col orange-bg " + (this.props.store.userColor === 'orange' && "active")} onClick={this.onColorSelection} id="orange"></div>
            <div className={"col purple-bg " + (this.props.store.userColor === 'purple' && "active")} onClick={this.onColorSelection} id="purple"></div>
          </div>
        </div>
        <div className="btn-done">
          <button type="button" className="btn btn-primary" onClick={() => this.props.store.teamEdit = false}>Done</button>
        </div>
      </div>
    ]

    return (
        <div className="team">
            {edit}
        </div>
    )
  }
}

Team = observer(Team)