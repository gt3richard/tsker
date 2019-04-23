import React, { PureComponent } from "react";
import {observer} from "mobx-react"

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verify from "./Verify";
import Return from "./Return";
import Forgot from "./Forgot";
import ForgotVerify from "./ForgotVerify";

import { Auth } from "aws-amplify";

export default class Authentication extends PureComponent {
  state = {
    username: "",
    email: "",
    password: "",
    phone_number: "",
    code: "",
    user: null, // will contain our user data object when signed in
    status: "",
    errorMessage: ""
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(user => this.handleAuthentication(user))
      .catch(err => {
        console.log(err)
        this.switchComponent("SignIn")
      } );
  }

  handleAuthentication = user => {
    this.props.store.userId = user.username
    this.props.store.accessToken = user.signInUserSession.idToken.jwtToken
    this.setState({user:user}) 
    this.switchComponent("Authenticated")
    this.props.store.getUser()
  }

  handleLogout = event => {
    event.preventDefault();
    Auth.signOut(
    )
    .then(()=>this.switchComponent("SignIn"))
    .catch(err => {
      console.log(err)
    })
  }

  // Handle changes to form inputs on sign-up, verification and sign-in
  handleFormInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      'errorMessage': ''
    });
  };

  handleErrorMessage = errorMessage => {
    this.setState({ errorMessage });
  }

  handleHome = event => {
    this.props.store.edit = false
    this.props.store.teamEdit = false
  }

  handleEdit = event => {
    this.props.store.edit = !this.props.store.edit
  }

  handleTeam = event => {
    this.props.store.teamEdit = !this.props.store.teamEdit
    this.props.store.edit = false
  }

  Navigation = () => {
    const homeButton = [
      <li className={"nav-item " + (!this.props.store.edit && !this.props.store.teamEdit && "active")} >
        <a className="nav-link" onClick={this.handleHome}>Home <span class="sr-only">(current)</span></a>
      </li>
    ]
    const editButton = [
      <li className={"nav-item " + (this.props.store.edit && "active")}>
        <a className="nav-link" onClick={this.handleEdit}>Edit</a>
      </li>
    ]
    const teamButton = [
      <li className={"nav-item " + (this.props.store.teamEdit && "active")}>
        <a className="nav-link" onClick={this.handleTeam}>Team</a>
      </li>
    ]
    const logoutButton = [
      <li className={"nav-item"}>
        <a className="nav-link" onClick={this.handleLogout}>Logout</a>
      </li>
    ]
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">Tskley</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                {homeButton}
                {this.state.status === 'Authenticated' && teamButton}
                {this.props.store.taskId && editButton}
                {this.state.status === 'Authenticated' && logoutButton}
              </ul>
            </div>            
          </nav>
    );
  }

  AuthComponent = () => {
    switch (this.state.status) {
      case "SignUp":
        return (
          <SignUp
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            handleErrorMessage={this.handleErrorMessage}
            inputs={this.state}
          />
        );
        
      case "Verify":
        return (
          <Verify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

        case "Return":
        return (
          <Return
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );
        
      case "SignIn":
        return (
          <SignIn
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            handleErrorMessage={this.handleErrorMessage}
            handleAuthentication={this.handleAuthentication}
            inputs={this.state}
          />
        );

      case "Forgot":
        return (
          <Forgot
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case "ForgotVerify":
        return (
          <ForgotVerify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            handleErrorMessage={this.handleErrorMessage}
            inputs={this.state}
          />
        );
      default:
        return <div />;
    }
  };

  switchComponent = status => {
    this.props.store.isAuthenticated = (status === 'Authenticated')
    this.setState({ status, 'errorMessage': '' });
  };
  
  render() {
    if(this.state.status === 'Authenticated' || this.state.status === '') {
      return (
        <div>
          {this.Navigation()}
        </div>
      )
    }
    else {
      return (
        <div>
         {this.Navigation()}
          <div className="jumbotron">
            <div className="container" >
              {this.AuthComponent()}
            </div>
          </div>
        </div>
      ) 
    }
  }
}

Authentication = observer(Authentication)