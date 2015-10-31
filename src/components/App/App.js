/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, {
  PropTypes, Component
}
from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';
import LoginStore from '../../stores/LoginStore';


@
withContext@ withStyles(styles)
class App extends Component {
  constructor() {
    super();
    this.state = {user: LoginStore.getProfile()};
    this._update = this._update.bind(this);
    console.log("Current app state", this.state.user);
  }

  _update() {
    this.setState({user: LoginStore.getProfile()});
    console.log("Current app state", this.state.user);
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._update);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._update);
  }


  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
    return !this.props.error ? (
      <div>
        <Header user={this.state.user}/>
        {this.props.children}
        <Footer />
      </div>
    ) : this.props.children;
  }



}

export default App;
