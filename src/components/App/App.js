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


/*
The Component acts as the source of truth for the User information, Children can be
passed the user prop as needed
*/

@
withContext@ withStyles(styles)
class App extends Component {
  constructor(props) {
    super(props);
    
   // console.log("app props in constructor", props);
    if(props.user) {
      this.state = {user: props.user};
      LoginStore.setUser(props.user, true);
    } else {
      this.state = {user: LoginStore.getProfile()};
    }
    this._update = this._update.bind(this);
   // console.log("Current app state", this.state.user);
  }

  _update() {
    this.setState({user: LoginStore.getProfile()});
  //  console.log("Current app state", this.state.user);
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
    return !this.props.error ? (
      <div>
        <Header user={this.state.user}/>
        {this.props.children}
        <Footer user={this.state.user}/>
      </div>
    ) : this.props.children;
  }



}

export default App;
