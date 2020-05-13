import React, { Component, useState } from "react";
import firebase from "../../firebase";
import styles from "../style";
import Orders from "../../orders";
import Main from "../header";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { Input } from "@material-ui/core";
import { subscribe } from 'react-contextual';
import { getStore } from "../../api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Login = (props) => {
  
  const [errorMessage, setError] = useState('');
  function handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  const onLogin = async e =>{
    e.preventDefault();

    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(props.restaurant.email,props.restaurant.password)
        .then( async userInfo => {
          console.log("after login in userInfo", userInfo);
          if(userInfo) {

            const user = await getStore(userInfo.user.uid);
            console.log("user info", user);
            props.history.push('/Orders');
          }
        })

    } catch (error ){
      setError(error.message);
    }
  }
  // function login(e) {

  //   e.preventDefault();
  //   const { history } = this.props;
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(this.state.email, this.state.password)
  //     .then((user) => {

  //       if(user) {
          
  //         history.push("/Orders");
  //       }
     
  //     })
  //     .catch((error) => {
  //       this.setState({ errorMessage: error.message });
  //     });
  //   // store.set("loggedIn", true);
  // }

    return (
      <div className="Login">
        <Main />
        <form>
          <h1 style={styles.logoText}>Welcome</h1>
          <Container maxWidth="sm">
            <div className="form-group">
              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.email}
                onChange={e => props.updateStore({email: e.target.value})}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
          
              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.password}
                onChange={e => props.updateStore({password: e.target.value})}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              {false && (
                <Snackbar open={true} autoHideDuration={1000}>
                  <Alert severity="error">
                    <Typography variant="h6">
                      {this.state.errorMessage}
                    </Typography>
                  </Alert>
                </Snackbar>
              )}
              <button
                style={styles.loginButton}
                type="submit"
                onClick={(e) => {
                  onLogin(e);
                }}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </Container>
        </form>
      </div>
    );
}

export default subscribe()(Login);
