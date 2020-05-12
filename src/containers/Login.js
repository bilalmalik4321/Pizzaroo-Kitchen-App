import React, { Component } from "react";
import fire from "../firebase";
import styles from "./style";
import Container from "@material-ui/core/Container";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  render() {
    return (
      <div className="Login">
        <form>
          <h1 style={styles.logoText}>Welcome</h1>
          <Container maxWidth="sm">
            <div className="form-group">
              <input
                style={styles.loginFormTextInput}
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="username"
              />
            </div>

            <div>
              <input
                style={styles.loginFormTextInput}
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              {this.state.errorMessage && (
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
                  this.login(e);
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
}

export default Login;
