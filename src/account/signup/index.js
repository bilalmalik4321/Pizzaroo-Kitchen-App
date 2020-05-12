import React, { Component, useState } from "react";
import fire from "../../firebase";
import styles from "../style";
import Orders from "../../orders/Orders";
import Main from "../Main";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import store from "store";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Signup = props => {



  function handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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
    store.set("loggedIn", true);
    }
    return (
      <div className="Login">
        <Main />
        <form>
          <h1 style={styles.logoText}>Welcome</h1>
          <Container maxWidth="sm">
            <div className="form-group">
              <input
                style={styles.loginFormTextInput}
                // value={this.state.email}
                // onChange={this.handleChange}
                type="email"
                name="email"
                class="form-control"
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
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Last Name"
              />
              <input
                style={styles.loginFormTextInput}
                // value={this.state.email}
                // onChange={}
                type="email"
                name="email"
                class="form-control"
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
                class="form-control"
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
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Store Email"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <input
                style={styles.loginFormTextInput}
                // value={}
                // onChange={}
                type="email"
                name="email"
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
                onClick={(e) => {
                  
                }}
                class="btn btn-primary"
              >
                Login
              </button>
            </div>
          </Container>
        </form>
      </div>
    );
  }

export default Signup;
