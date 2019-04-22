import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Team.scss';

export default class ColorSelector extends Component {
  constructor(props) {
    super(props)

    this.onColorSelection = this.onColorSelection.bind(this)
  }

  onColorSelection = (event) => {
    this.props.store.userColor = event.target.id
  }

  render() {
    return (
        <div className="color">
          <div className="row">
            <div className={"col blue-bg " + (this.props.store.userColor === 'blue' && "active")} onClick={this.onColorSelection} id="blue"></div>
            <div className={"col green-bg " + (this.props.store.userColor === 'green' && "active")} onClick={this.onColorSelection} id="green"></div>
            <div className={"col red-bg " + (this.props.store.userColor === 'red' && "active")} onClick={this.onColorSelection} id="red"></div>
            <div className={"col orange-bg " + (this.props.store.userColor === 'orange' && "active")} onClick={this.onColorSelection} id="orange"></div>
            <div className={"col purple-bg " + (this.props.store.userColor === 'purple' && "active")} onClick={this.onColorSelection} id="purple"></div>
          </div>
        </div>
    )
  }
}

ColorSelector = observer(ColorSelector)