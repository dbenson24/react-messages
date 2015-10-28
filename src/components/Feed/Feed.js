/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Feed.css';
import withStyles from '../../decorators/withStyles';
import RepositoryStore from '../../stores/RepositoryStore';

@withStyles(styles)

class Feed extends Component {
  
  constructor() {
  super();
  this.state = {repositories: []};
  this._update = this._update.bind(this);
 }

  render() {
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
    this.setState({repositories: RepositoryStore.getAll()});
  }

}

class Repository extends Component {
  
  render() {
    return (
      <div className="Repository-container">
        <div className="Repository">
          <p>{this.props.repo.name}</p>
        </div>
      </div>
    );
  }
  
}


export default Feed;
