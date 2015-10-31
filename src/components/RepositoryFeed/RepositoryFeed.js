/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './RepositoryFeed.css';
import withStyles from '../../decorators/withStyles';
import RepositoryStore from '../../stores/RepositoryStore';
import classNames from 'classnames';


@withStyles(styles)

class RepositoryFeed extends Component {
  
  constructor() {
  super();
  this.state = this._getState();
  this._update = this._update.bind(this);
 }
 
 static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Github Repositories';
    this.context.onSetTitle(title);
    return (
      <div className="Feed">
        <div className="Feed-container">
          {this.state.repositories.map((repo) => {
            return (<Repository repo={repo} key={repo.id} />);
            }
          )}
        </div>
      </div>
    );
  }
  
  componentDidMount () {
    RepositoryStore.addChangeListener(this._update);
  }

  componentWillUnmount () {
    RepositoryStore.removeChangeListener(this._update);
  }
  
  _update() {
    console.log("Recieved change event");
    this.setState(this._getState());
  }
  
  _getState() {
    return {
      repositories: RepositoryStore.getAll()
    };
  }

}

class Repository extends Component {
  
  render() {
    return (
      <div className="Repository-container">
        <div className="Repository">
          <div className="Repository-top">
            <span className="Repository-description">{this.props.repo.description}</span>
          </div>
          <div className="Repository-bottom">
            <span className={classNames({"Forked":this.props.repo.fork, "Repository-name":true})}>{this.props.repo.name}</span>
            <a className="Repository-link" href={this.props.repo.html_url}>View</a>
          </div>
        </div>
      </div>
    );
  }
  
}


export default RepositoryFeed;
