import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
import styles from "./style";
import { getUser } from "./api";
import firebase from "../firebase";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [returnError, setReturnError] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <h1 style={styles.logoText}>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormControl
            autoFocus
            type="email"
            placeholder="username"
            placeholdercolor="#c4c3cb"
            style={styles.loginFormTextInput}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormControl
            value={password}
            placeholder="password"
            placeholdercolor="#c4c3cb"
            style={styles.loginFormTextInput}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button
          style={styles.loginButton}
          disabled={!validateForm()}
          type="submit"
          onClick={() => {
            setReturnError("");
            console.log("helllo");
          }} //onLoginPress
        >
          Login
        </Button>
      </form>
    </div>
  );
}
