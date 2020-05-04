import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";


class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (


<div>
          <Container style={{marginTop:"15%", marginBottom:"15%"}}>
          <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>

      </Form.Group>

      <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
          </Form.Group>
      {loginError && (
      <Alert variant={'danger'}>
          Incorrect login credentials. Try again.
      </Alert>
      )}
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
          </Button>
          </Container>
    </div>
          /**
          <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign in
          </Typography>
          <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      onChange={this.handleEmailChange}
      />
      <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      onChange={this.handlePasswordChange}
      />
      {loginError && (
      <Typography component="p" className={classes.errorText}>
          Incorrect email or password.
      </Typography>
      )}
    <Button
      type="button"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={this.handleSubmit}
          >
          Sign In
      </Button>
      </Paper>
      </Container>
           **/
    );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default (connect(mapStateToProps)(Login));
