import React, { Component } from "react";
import fire from "../../firebase";
import styles from "../style";
import Orders from "../../orders";
import Main from "../header";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { Input } from "@material-ui/core";

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
  render() {
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
                value={this.state.email}
                onChange={this.handleChange}
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
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                className="form-control"
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
}

export default Login;
