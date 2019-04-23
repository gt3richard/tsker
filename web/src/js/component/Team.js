import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Team.scss';

import JoinField from './team/JoinField.js'
import RoleToggle from './team/RoleToggle.js'
import ColorSelector from './team/ColorSelector.js'

export default class Team extends Component {
  constructor(props) {
    super(props)

    this.props.store.getUser()
  }

  render() {
    const join = [
      <div className="team-join" key="join">
        <h1 className="display-4">Join a Team</h1>
        <p className="lead">Use your team code to join a team.</p>
        <hr className="my-4" />
        <JoinField store={this.props.store} />
      </div>
    ]

    const edit = [
      <div className="team-edit" key="edit">
        <h1 className="display-4">{this.props.store.userTeam}</h1>
        <hr className="my-4" />
        <RoleToggle store={this.props.store} />
        <ColorSelector store={this.props.store} />
      </div>
    ]

    return (
        <div className="team">
            {(this.props.store.userTeam && edit) || join}
        </div>
    )
  }
}

Team = observer(Team)