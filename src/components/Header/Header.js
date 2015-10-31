/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">Derek Benson</span>
          </a>
          <span>{this.getText()}</span>
          <Navigation className="Header-nav" />
        </div>
      </div>
    );
  }
  
  getText() {
    if(this.props.user) {return this.props.user.username;} else {return "Logged out";};
  }
}

export default Header;
