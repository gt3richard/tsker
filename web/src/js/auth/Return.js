import React, { Component } from "react";
import '../../assets/Auth.scss'

export default class Return extends Component {

  componentDidMount() {
    setTimeout( function() {
      this.props.switchComponent("SignIn") 
    }.bind(this),
    5000
    )
  }

  render() {
    return (
      <form className="authentication__form">
        <h2>
          Thank your for signing up.
        </h2>
        <h6>
           Please return to the homepage to login. This page will redirect in 5 seconds.
        </h6>
      </form>
    );
  }
}
