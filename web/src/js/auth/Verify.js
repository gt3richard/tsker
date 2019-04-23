import React, { Component } from "react";
import { Auth } from "aws-amplify";
import '../../assets/Auth.scss'

export default class Verify extends Component {
  handleVerification = event => {
    event.preventDefault();
    const { username, code } = this.props.inputs;
    // After retrieveing the confirmation code from the user
    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(()=>this.props.switchComponent("SignIn"))
      .catch(err => console.log(err));
  };

  handleResendVerification = event => {
    event.preventDefault();
    const { username } = this.props.inputs;

    Auth.resendSignUp(username, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(()=>this.props.switchComponent("Verify"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form className="authentication__form">
        <h2>
          Please verify your email account.
        </h2>
        <h6>
          Thank your for signing up. Please check your email for a verification link to complete your registration.
        </h6>
      </form>
    );
  }
}
