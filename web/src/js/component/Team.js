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
        <h1 className="display-4">{this.props.store.userData['team']}</h1>
        <hr className="my-4" />
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" onClick={() => this.onRoleChange("user")}>
            <input type="radio" name="options" id="user"/> User
          </label>
          <label className="btn btn-secondary" onClick={() => this.onRoleChange("manager")}>
            <input type="radio" name="options" id="manager" /> Manager
          </label>
        </div>
      </div>
    ]

    return (
        <div className="team">
            {join}
        </div>
    )
  }
}

Team = observer(Team)