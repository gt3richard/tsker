import React, { Component } from "react";
import { Auth } from "aws-amplify";
import '../../assets/Auth.scss'
import TextField from '@material-ui/core/TextField';

export default class SignIn extends Component {
  handleSignIn = event => {
    event.preventDefault();
    const { username, password } = this.props.inputs;
    Auth.signIn({ username, password })
      .then(user => this.props.handleAuthentication(user))
      .catch(err => {
        console.log(err)
        switch(err.code) {
          case 'UserNotConfirmedException':
          case 'PasswordResetRequiredException':
          case 'NotAuthorizedException':
          case 'UserNotFoundException':
            this.props.handleErrorMessage(err.message)
            break
          default:
            this.props.handleErrorMessage('Unknown Error')
            break
        }
      });
  };

  render() {
    return (
      <form className="authentication__form">
        <h2>
          Login
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
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              value={this.props.password}
              onChange={this.props.handleFormInput}
              className="authentication__input"
            />
          </div>
          <div className="errorText">{this.props.inputs.errorMessage}</div>
          <div className="input-group mb-3">
            <input
              type="submit"
              value="Login"
              onClick={this.handleSignIn}
              className="authentication__button btn btn-primary btn-lg btn-block"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="button"
              value="Forgot your password?"
              onClick={() => this.props.switchComponent("Forgot")}
              className="authentication__button btn btn-link helpLink"
            />
          </div>
          <em>Don't have an account?</em>
          <div className="input-group mb-3">
            <input
              type="button"
              value="Create Account"
              onClick={() => this.props.switchComponent("SignUp")}
              className="authentication__button btn btn-secondary btn-lg btn-block"
            />
          </div>
      </form>
    );
  }
}
