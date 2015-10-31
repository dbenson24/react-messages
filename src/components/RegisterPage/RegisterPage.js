/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.css';

@withStyles(styles)
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>
          <p>{this.getText()}</p>
        </div>
      </div>
    );
  }
  
  getText() {
    if(this.props.user) {
      return "You are logged in as " + this.props.user.username + "!";
    } else {
      return "Please log in";
    }
  }

}

export default RegisterPage;
