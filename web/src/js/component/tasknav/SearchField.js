import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

export default class SearchField extends Component {
  constructor(props) {
    super(props)

    this.onSearch   = this.onSearch.bind(this)
  }

  onSearch = (event) => {
    this.props.store.filterTasks(event.target.value)
  }

  render() {
    return(
        <div className="input-group mb-3">
            <input type="text" className="form-control searchBox" placeholder="Search ..." onChange={this.onSearch} aria-describedby="inputGroup-sizing-default" />
        </div>
    )
  }
}

SearchField = observer(SearchField)