import React, { Component, useState } from "react";
import fire from "../../firebase";
import styles from "../style";
import Orders from "../../orders";
import Main from "../header";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import {geoCoding,getDistanceFromLatLonInKm, createStore } from '../../api';
import { Input } from '@material-ui/core';
import { subscribe } from 'react-contextual';

// import store from "store";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Signup = props => {

  console.log("props", props);
  const [errors, setErrors] = useState(null);
  async function login(e) {
    e.preventDefault();
    const { email, password, description, firstName, lastName, storeName, phone, website, street, province, city, postalCode, country, registrationCode } = props.restaurant;

    // TODO check registraion code in here

    await createStore({
      email,
      phone,
      password,
      website,
      description,
      firstName,
      lastName,
      storeName,
      street,
      province,
      city,
      postalCode,
      country
    });

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        props.history.push("/Orders");
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
              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.firstName}
                onChange={ e => {
                  console.log("value", e.target.value);
                  props.updateStore('firstName', e.target.value)
                  
                }}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="First Name"
              />
            
              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.lastName}
                onChange={(e)=> props.updateStore({lastName: e.target.value})}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Last Name"
              />

              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.storeName}
                onChange={(e)=> props.updateStore({storeName: e.target.value})}
                type="text"
                // name="password"
                className="form-control"
                // id="exampleInputPassword1"
                placeholder="Store Name"
              />
              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.phone}
                onChange={(e)=> props.updateStore({phone: e.target.value})}
                type="text"
                // name="email"
                className="form-control"
                id="exampleInputEmail1"
                // aria-describedby="emailHelp"
                placeholder="Store Phone Number"
              />
              <Input
                disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.website}
                onChange={(e)=> props.updateStore({website: e.target.value})}
                type="email"
                // name="email"
                className="form-control"
                id="exampleInputEmail1"
                // aria-describedby="emailHelp"
                placeholder="Store Website"
              />
              <Input
                    disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.email}
                onChange={(e)=> props.updateStore({email: e.target.value})}
                type="email"
                // name="password"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Store Email"
              />
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.password}
                onChange={(e)=> props.updateStore({password: e.target.value})}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.repeatPassword}
                onChange={(e)=> props.updateStore({repeatPassword: e.target.value})}
                type="password"
                name="password"
                className="form-control"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Confirmed Password"
              />
            
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.street}
                onChange={(e)=> props.updateStore({street: e.target.value})}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Store Street Address"
              />
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.city}
                onChange={(e)=> props.updateStore({city: e.target.value})}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="City"
              />

              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.province}
                onChange={(e)=> props.updateStore({province: e.target.value})}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Province"
              />
            
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.postalCode}
                onChange={(e)=> props.updateStore({postalCode: e.target.value})}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Postal Code"
              />
                 
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.country}
                onChange={(e)=> props.updateStore({country: e.target.value})}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Country"
              />
              
              <Input
                  disableUnderline={true}
                style={styles.loginFormTextInput}
                value={props.restaurant.registrationCode}
                onChange={(e)=> props.updateStore({registrationCode: e.target.value})}
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
