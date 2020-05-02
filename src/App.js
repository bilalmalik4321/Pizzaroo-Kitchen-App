import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Main from "./containers/Main";
import Orders from "./containers/Orders";
import history from "./containers/History";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }
  render() {
    return <div>{this.state.user ? <Orders /> : <Main />}</div>;
  }
}
export default App;
