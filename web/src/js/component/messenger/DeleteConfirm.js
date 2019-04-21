import React, { Component } from 'react';
import '../../../assets/App.scss';
import '../../../assets/Tasks.scss';

export default class DeleteConfirm extends Component {
    constructor(props) {
        super(props)
    
        this.onDelete = this.onDelete.bind(this)
      }

    onDelete = (event) => {
        this.props.store.deleteTask()
    }

    render() {
        return (
            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    Are you sure you want to delete this task?
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={this.onDelete} data-dismiss="modal">Delete</button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}