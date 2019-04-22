import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Team.scss';

export default class JoinField extends Component {
  constructor(props) {
    super(props)

    this.state= {
      'code': ''
    }

    this.props.store.getUser()
    this.onClick          = this.onClick.bind(this)
    this.onCodeChange     = this.onCodeChange.bind(this)
  }

  onClick = (event) => {
    this.props.store.joinTeam(this.state.code)
    this.setState({code: ''})
  }

  onCodeChange = (event) => {
    this.setState({code: event.target.value})
  }

  render() {
    return (
       <div className="input-group input-group-lg mb-3">
          <input type="text" className="form-control" id="team-code" value={this.state.code} onChange={this.onCodeChange} aria-describedby="inputGroup-sizing-default" />
          <a className="btn btn-primary btn-lg" href="#" role="button" onClick={this.onClick}>Join</a>
        </div>
    )
  }
}

JoinField = observer(JoinField)