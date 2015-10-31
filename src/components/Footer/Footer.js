/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles)
class Footer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    // This is just an example how one can render CSS
    const { width, height } = this.props.viewport;
    this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);
    let userText = "Please login";
    let userLinkText = 'LOGIN'
    let userLinkHref = '/login'
    let userLinkOnClick = Link.handleClick;
    if(this.props.user) {
      userText = "Logged in as: " + this.props.user.username;
      userLinkText = 'LOGOUT';
      userLinkHref = '/logout'
      userLinkOnClick = "";
    }
    
    
    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">© Derek Benson</span>
          <span className="Footer-spacer">·</span>
          <a className="Footer-link" href="/" onClick={Link.handleClick}>Home</a>
          <span className="Footer-spacer"> | </span>
          <span className="Footer-text">{userText}</span>
          <span className="Footer-spacer"> | </span>
          <a className="Footer-text" href={userLinkHref} onClick={userLinkOnClick}>{userLinkText}</a>
          <span className="Footer-spacer"> | </span>
          <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">Viewport:</span>
        </div>
      </div>
    );
  }

}

export default Footer;
