import React, { Component } from 'react';
import '../../assets/App.scss';
import '../../assets/Intro.scss';

export default class Intro extends Component {

  render() {
    return (
        <div className="intro">
            <div className="intro-title">
                <h2>Simple Task Management</h2>
                <p>A task messenger.</p>
            </div>
            <hr/>
            <footer>
                <div className="footer">© 2019 by tskley</div>
            </footer>
        </div>
    )
  }
}