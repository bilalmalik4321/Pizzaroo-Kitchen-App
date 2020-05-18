import React, { Component, useState } from "react";
import fire from "../../firebase";
import styles from "./style";
import Main from "../../app/layout/header";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import {geoCoding,getDistanceFromLatLonInKm, createStore } from '../../api';
import { Input, Select, MenuItem , TextField, Grid, Button} from '@material-ui/core';
import { subscribe } from 'react-contextual';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'hookrouter';

import * as validations from './validations'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },

  form: {
    paddingBottom: 200
  },
  input: {
    // fontSize: 20,
    // width: '100%',
    marginTop: 30
    // height: 45,
  
  },
  button: {
    height: 40,
    marginTop: 30,
    color: 'white',
    backgroundColor: 'green',


  }
}));


const Signup = props => {

  console.log("props", props.restaurant);
  const [errors, setErrors] = useState(null);

  const classes = useStyles();
  async function login(e) {
    e.preventDefault();
    const { email, password, description, firstName, lastName, storeName, phone, website, street, province, city, postalCode, country, registrationCode } = props.restaurant;

    const err = validations.signup(props);

    if( Object.keys(err).length !== 0) {
      setErrors(err);
    } else {

      // TODO check registraion code in here
      const { result , error } = await createStore({
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
  
      if( result ) {
        navigate('/login');;
      } else {
        alert(error)
        console.log("error registrating a store", error);
      }
    }
  

  
  }

  const inputProps = {
    disableUnderline: false,
    sise: 30
  }

    return (

        <form className={classes.form}>
          <h1 style={styles.logoText}>Welcome</h1>
          <Container maxWidth={'sm'}>
            <Grid container direction="column" spacing={2}>
            <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}


                value={props.restaurant.firstName}
                onChange={ e => {
                  console.log("value", e.target.value);
                  props.updateStore('firstName', e.target.value)
                  
                }}
            
                placeholder="First Name"
              />
            
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}

                value={props.restaurant.lastName}
                onChange={(e)=> props.updateStore({lastName: e.target.value})}
                type="text"
              
                placeholder="Last Name"
              />

              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                style={styles.loginFormTextInput}
                value={props.restaurant.storeName}
                onChange={(e)=> props.updateStore({storeName: e.target.value})}
                type="text"
                // name="password"
            
                // id="exampleInputPassword1"
                placeholder="Store Name"
              />
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.phone}
                onChange={(e)=> props.updateStore({phone: e.target.value})}
                type="text"
                // name="email"
                className="form-control"
            
                // aria-describedby="emailHelp"
                placeholder="Store Phone Number"
              />
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.website}
                onChange={(e)=> props.updateStore({website: e.target.value})}
                placeholder="Store Website"
              />
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.email}
                onChange={(e)=> props.updateStore({email: e.target.value})}
                placeholder="Store Email"
              />
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.password}
                onChange={(e)=> props.updateStore({password: e.target.value})}
                type="password"
                placeholder="Password"
              />
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.repeatPassword}
                onChange={(e)=> props.updateStore({repeatPassword: e.target.value})}
                placeholder="Confirmed Password"
              />
            
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.street}
                onChange={(e)=> props.updateStore({street: e.target.value})}
                placeholder="Store Street Address"
              />
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.city}
                onChange={(e)=> props.updateStore({city: e.target.value})}
                placeholder="City"
              />

              {/* <Input
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
              /> */}
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                select
                onChange={(e)=> props.updateStore({province: e.target.value})}
                value={'Ontario'}
              >
              <MenuItem value={'Ontario'}>Ontario</MenuItem>
              </TextField>
            
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.postalCode}
                onChange={(e)=> props.updateStore({postalCode: e.target.value})}
                placeholder="Postal Code"
              />
                 
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={'Canada'}
                onChange={(e)=> props.updateStore({country: e.target.value})}
                placeholder="Country"
              />
              
              <TextField
                InputProps={{style: {fontSize: 15}}}
                size="small"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.registrationCode}
                onChange={(e)=> props.updateStore({registrationCode: e.target.value})}
                placeholder="Registraion CODE"
              />
       
              {false && (
                <Snackbar open={true} autoHideDuration={1000}>
                  <Alert severity="error">
                    <Typography variant="h6">
                     //TODO
                    </Typography>
                  </Alert>
                </Snackbar>
              )}
              <Button
                className={classes.button}
                type="submit"
                onClick={ async (e) => {
                  e.preventDefault();
              
                }}
              >
                Login
              </Button>
            </Grid>
          </Container>
        </form>
  
    );
  }

export default subscribe()(Signup);
