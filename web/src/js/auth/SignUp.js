import React, { Component } from "react";
import { Auth } from "aws-amplify";
import '../../assets/Auth.scss'
import TextField from '@material-ui/core/TextField';

export default class SignUp extends Component {

  handleSignUp = event => {
    event.preventDefault();
    const { username, password } = this.props.inputs;
    Auth.signUp({
      username,
      password,
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .then(()=>this.props.switchComponent("Return")) // switches Sign Up to Verification
      .catch(err => {
        console.log(err)
        switch(err.code) {
          case 'InvalidParameterException':
          case 'InvalidPasswordException':
            this.props.handleErrorMessage('Password should be 6 or more characters, contain upper and lower case letters, and contain at least one number.')
            break
          case 'UsernameExistsException':
            this.props.handleErrorMessage(err.message)
            break
          default:
            this.props.handleErrorMessage('Unknown Error')
            break
        }
      })
  };

  render() {
    return (
      <form className="authentication__form">
        <h2>
          Create a new account
        </h2>
        <div className="input-group mb-3">
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
        <div className="input-group mb-3">
          <TextField
            id="standard-password-input"
            label="Password"
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
        <div className="input-group mb-3">
          <input
            type="submit"
            value="Join"
            onClick={this.handleSignUp}
            className="authentication__button btn btn-primary btn-lg btn-block"
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