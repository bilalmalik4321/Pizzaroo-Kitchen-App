import React, { Component } from 'react';
import fire from '../firebase';
import styles from "./style";
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
       <div className="Login">
       <form>
       <h1 style={styles.logoText}>Welcome</h1>
      <div className="form-group">
       <input style={styles.loginFormTextInput} value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="username" />
      </div>
       <div className="form-group">
      <input style={styles.loginFormTextInput} value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button style={styles.loginButton} type="submit" onClick={this.login} class="btn btn-primary">Login</button>
 </form>
 
 </div>
    );
  }
}
export default Login;