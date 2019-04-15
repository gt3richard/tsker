import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

const modeDescrip = "Switch to only done / not-done mode."
const resetDescrip = "Set the frequency that tasks will be reset automatically."

export default class EditMenu extends Component {
  constructor(props) {
    super(props);

    this.onClickSimpleMode = this.onClickSimpleMode.bind(this)
    this.onChangeResetMode = this.onChangeResetMode.bind(this)
  }

  onClickSimpleMode(event) {
    if(this.props.store.stateMode === 'simple') {
      this.props.store.stateMode = 'complex'
    } else {
      this.props.store.stateMode = 'simple'
    }
    this.props.store.updateUserData()
  }

  onChangeResetMode(mode) {
    this.props.store.resetMode = mode
    this.props.store.updateUserData()
  }

  render() {
    const stateMode = [
      <div className="stateMode" key="stateMode">
        <button type="button" className={this.props.store.stateMode === 'simple' ? "btn btn-primary active" : "btn btn-primary"} onClick={this.onClickSimpleMode} data-toggle="button">
          Simple Mode
        </button>
      </div>
    ]

    const resetMode = [
      <div className="resetMode" key="resetMode">
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label 
            className={this.props.store.resetMode === 'monthly' ? "btn btn-secondary active": "btn btn-secondary"} 
            onClick={(event) => this.onChangeResetMode('monthly')}
            value="monthly"
            >
            Monthly
            <input type="radio" name="options" id="monthly"/>
          </label>
          <label 
            className={this.props.store.resetMode === '10days' ? "btn btn-secondary active": "btn btn-secondary"}
            onClick={(event) => this.onChangeResetMode('10days')}
            value="10days"
            >
            10 Days
            <input type="radio" name="options" id="10days" />
          </label>
          <label 
            className={this.props.store.resetMode === 'disable' ? "btn btn-secondary active": "btn btn-secondary"}
            onClick={(event) => this.onChangeResetMode('disable')}
            value="disable"
            >
            Disable
            <input type="radio" name="options" id="disable" />
          </label>
        </div>
      </div>
    ]

      if(this.props.store.edit) {
        return (
          <div className="editMenu" key="editMenu">
            <div className="row">
              <div className="col-sm-6">
                <div className="card mb-3 edit">
                  <div className="card-body edit">
                    <h5 className="card-title edit">Modes</h5>
                    <p className="card-text edit">{modeDescrip}</p>
                    {stateMode}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card mb-3 edit">
                  <div className="card-body edit">
                    <h5 className="card-title edit">Reset Frequency</h5>
                    <p className="card-text edit">{resetDescrip}</p>
                    {resetMode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return <div className="editMenu" key="editMenu"></div>
      } 
  }
}

EditMenu = observer(EditMenu)