import React, { Component, useState } from "react";
import fire from "../../firebase";
import styles from "../style";
import Orders from "../../orders";
import Main from "../header";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import {geoCoding,getDistanceFromLatLonInKm } from '../../api';
import { subscribe } from 'react-contextual';
// import store from "store";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Signup = props => {

  console.log("props", props);
  function login(e) {
    e.preventDefault();
    const { history } = this.props;
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        history.push("/Orders");
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
    // store.set("loggedIn", true);
    }
    return (
      <div >
        <Main />
        <form>
          <h1 style={styles.logoText}>Welcome</h1>
          <Container maxWidth={'sm'}>
            <div >
              <input
                style={styles.loginFormTextInput}
                // value={this.state.email}
                // onChange={this.handleChange}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="First Name"
              />
            
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Last Name"
              />

              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Store Name"
              />
              <input
                style={styles.loginFormTextInput}
                // value={this.state.email}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Store Phone Number"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Store Website"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Store Email"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Confirmed Password"
              />
            
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Store Street Address"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="City"
              />

              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Province"
              />
            
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Postal Code"
              />
                 
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Country"
              />
              
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Registraion CODE"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              {false && (
                <Snackbar open={true} autoHideDuration={1000}>
                  <Alert severity="error">
                    <Typography variant="h6">
                     //TODO
                    </Typography>
                  </Alert>
                </Snackbar>
              )}
              <button
                style={styles.loginButton}
                type="submit"
                onClick={ async (e) => {
                  e.preventDefault();
              
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

export default subscribe()(Signup);
