import React, { Component } from "react";
import { Auth } from "aws-amplify";
import '../../assets/Auth.scss'
import TextField from '@material-ui/core/TextField';

export default class ForgotVerify extends Component {
  handleVerification = event => {
    event.preventDefault();
    const { username, code, password } = this.props.inputs;
    // After retrieveing the confirmation code from the user
    Auth.forgotPasswordSubmit(username, code, password, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(()=>this.props.switchComponent("SignIn"))
      .catch(err => console.log(err));
  };

  handleResetPassword = event => {
    event.preventDefault();
    const { username } = this.props.inputs;

    Auth.forgotPassword(username, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(()=>this.props.switchComponent("ForgotVerify"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form className="authentication__form">
        <h2>
          Enter verification code
        </h2>
        <div className="input-group mb-3 input-group-lg">
          <TextField
              id="standard-input"
              label="Code"
              type="text"
              name="code"
              autoComplete="code"
              margin="normal"
              value={this.props.code}
              onChange={this.props.handleFormInput}
              className="authentication__input"
            />
        </div>
        <div className="input-group mb-3">
          <TextField
            id="standard-password-input"
            label="New Password"
            type="password"
            name="password"
            autoComplete="password"
            margin="normal"
            value={this.props.password}
            onChange={this.props.handleFormInput}
            className="authentication__input"
          />
        </div>
        <div className="errorText">{this.props.inputs.errorMessage}</div>
        <div className="input-group mb-3 input-group-lg">
          <input
            type="submit"
            value="Change Password"
            onClick={this.handleVerification}
            className="authentication__button btn-primary btn-lg btn-block"
          />
        </div>
        <div className="input-group mb-3">
            <input
              type="button"
              value="Resend Link"
              onClick={this.handleResetPassword}
              className="authentication__button btn btn-link helpLink"
            />
        </div>
      </form>
    );
  }
}
