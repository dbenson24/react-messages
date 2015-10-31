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
    
    console.log("app props in constructor", this.props);
    /*if(this.props.user) {
      this.state = {user: this.props.user};
    } else {*/
      this.state = {user: LoginStore.getProfile()};
    //}
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
    user: PropTypes.object,
    error: PropTypes.object,
  };

  render() {
    console.log("app props", this.props);
    return !this.props.error ? (
      <div>
        <Header user={this.props.user}/>
        {this.props.children}
        <Footer />
      </div>
    ) : this.props.children;
  }



}

export default App;
