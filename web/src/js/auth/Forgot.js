import React, { Component } from "react";
import { Auth } from "aws-amplify";
import '../../assets/Auth.scss'
import TextField from '@material-ui/core/TextField';

export default class Forgot extends Component {
  
  handleResetPassword = event => {
    event.preventDefault();
    const { username } = this.props.inputs;

    Auth.forgotPassword(username, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(data => console.log(data))
      .then(()=>this.props.switchComponent("ForgotVerify"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form className="authentication__form">
        <h2>
          Reset password
        </h2>
        <div className="input-group mb-3 input-group-lg">
        <TextField
              id="standard-email-input"
              label="Email"
              type="username"
              name="username"
              autoComplete="email"
              margin="normal"
              value={this.props.username}
              onChange={this.props.handleFormInput}
              className="authentication__input"
            />
        </div>
        <div className="input-group mb-3 input-group-lg">
          <input
            type="submit"
            value="Reset"
            onClick={this.handleResetPassword}
            className="authentication__button btn-primary btn-lg btn-block"
          />
        </div>
        <div className="input-group">
          <p className="textLink">Have an account?
            <input
                type="button"
                value="Sign In"
                onClick={() => this.props.switchComponent("SignIn")}
                className="authentication__button btn btn-link"
              />
          </p>
        </div>
      </form>
    );
  }
}
