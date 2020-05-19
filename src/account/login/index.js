import React, { Component, useState, useEffect } from "react";
import firebase from "../../firebase";
import styles from "../style";
import Main from "../../app/layout/header";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { Input, TextField, Grid } from "@material-ui/core";
import { subscribe } from 'react-contextual';
import { getStore } from "../../api";
import { navigate } from 'hookrouter';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Login = (props) => {
  
  const { loggedIn } = props.restaurant;
  console.log('user props app', props);

  const [errorMessage, setError] = useState({});

  const isEmpty = (errors, key) => {
    const result =  Object.keys(errors).length !== 0 && errors[key] !== undefined
  
    // console.log(`error - ${key} is`, result);
    return result
    
    }
  const validate = () => {
    const { email, password } = props.restaurant;
    let error = {};

    if(!email || email.lenght < 6 ) error.email = "Enter a valid email.";
    if(!password || password.length < 6) error.password = "Enter a valid password.";

    return error;
  }

  const onLogin = async e =>{

    try {
      props.updateStore({loading: true})
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(props.restaurant.email,props.restaurant.password)
        .then( async userInfo => {
          console.log("after login in userInfo", userInfo);
          if(userInfo) {
            const user = await getStore(userInfo.user.uid);
            props.updateStore({...user, loggedIn: true, loading: false});
            console.log("user info", user);
            navigate('/order');
          }
        }).catch(err => {
          if(err.code === 'auth/invalid-email')
            setError({
              email: 'Enter a valid email address.'
            });
          else {
            setError({
              password: err.message
            })
           }
        }) 

    } catch (error ){
      if(error.code === 'auth/invalid-email')
        setError({
          email: 'Enter a valid email address.'
        });
      else {
        setError({
          password: error.message
        })
      }
    }
  }
    return (
      <div>
        <form> 
          <h1 style={styles.logoText}>Welcome</h1>
          <Grid  container direction="column"  justify="center" alignItems='center' >
            <Grid item xs >
              <TextField
                  style={{ width: 500, marginTop: 20 , minWidth: 200, maxWidth: 600}}
                  label="Email"
                  // className={classes.input}
                  value={props.restaurant.email || ''}
                  onChange={e => props.updateStore({email: e.target.value})}
                  type="email"
                  placeholder="Email"
                  size="medium"
                  variant="outlined"
                  error={isEmpty(errorMessage,'email') }
                  helperText={isEmpty(errorMessage,'email')? errorMessage.email : ''}
                />
            </Grid>
             
            <Grid item xs>
              <TextField
                  style={{ width: 500, marginTop: 20 ,marginBottom: 20, minWidth: 200, maxWidth: 600}}
                  variant="outlined"
                  label="Password"
                  size="medium"
                  value={props.restaurant.password || ''}
                  onChange={e => props.updateStore({password: e.target.value})}
                  type="password"
                  placeholder="Password"
                  error={isEmpty(errorMessage,'password') }
                  helperText={isEmpty(errorMessage,'password')? errorMessage.password : ''}
                />

            </Grid>
              
          </Grid>

            <div style={{ textAlign: "center" }}>
              <button
                style={styles.loginButton}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  let err = validate();
                  console.log("errr",err)
                  if(Object.keys(err).length === 0)
                    onLogin(e)
                  else
                    setError(err)
                }}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
      
        </form>
      </div>
    );
}

export default subscribe()(Login);

