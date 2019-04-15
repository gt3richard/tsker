import React, { Component } from 'react';
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

export default class TaskAdd extends Component {
  constructor(props) {
      super(props);

      this.state = {
          name: "",
          date: "1"
      }

      this.handleFormInput = this.handleFormInput.bind(this)
      this.handleAdd = this.handleAdd.bind(this)
  }

  handleFormInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleAdd = event => {
    if((event.key === undefined || event.key === 'Enter') 
      && (this.state.name && this.state.date)) {
        this.props.store.addTask(this.state.name, this.state.date)
        this.setState({"name": "", "date": "1"})
    }
  }

  render() {
    const options = Array.from(Array(31).keys()).map(m => {
      const date = (m+1).toString()
      return <option key={m} value={date}>{this.props.store.month[date]}</option>
    })

    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3">
                <input type="text" 
                  value={this.state.name}
                  maxLength={20} 
                  onChange={this.handleFormInput} 
                  onKeyPress={this.handleAdd} 
                  id="name" 
                  className="form-control task-item task-add-title" 
                  placeholder="Task name" 
                  autoComplete="off"
                />
                <select className="task-add-date" 
                  id="date" 
                  value={this.state.date} 
                  onChange={this.handleFormInput}
                >
                  {options}
                </select>
                <div className="input-group-append" key="add">
                  <button className="btn btn-outline-dark" 
                    onClick={this.handleAdd} 
                    type="button" 
                    id="button-addon2">
                      <i className="fas fa-plus task-add"></i>
                  </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
