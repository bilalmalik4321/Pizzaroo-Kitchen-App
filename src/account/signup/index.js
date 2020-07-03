import React, { useEffect, useState } from "react";
import fire from "../../firebase";

import styles from "../style";
import Typography from "@material-ui/core/Typography";
import {geoCoding,getDistanceFromLatLonInKm, createStore } from '../../api';
import { Input, Select, MenuItem , TextField, Grid, Button} from '@material-ui/core';
import { subscribe } from 'react-contextual';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'hookrouter';
import Checkbox from '@material-ui/core/Checkbox';
import * as validations from './validations'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from '@material-ui/core';
import './signup.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },

  form: {
    paddingBottom: 200
  },
  input: {
    margin: theme.spacing(1),

    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500"
    }

  
  },
  button: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    marginTop: 20,
    color: 'white',
    fontSize: 25,
    backgroundColor: 'green',


  },
  checkButton: {
  
    paddingLeft: 10,
    size: 30
  }
}));


const Signup = props => {


  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [accept, setAccept] = useState(false);
  const classes = useStyles();
  
  
  async function onRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password, firstName, lastName, storeName, storePhone, website, street, province, city, postalCode, country, registrationCode } = props.restaurant;
      console.log("call register")
      // TODO check registraion code in here
      const { result , error } = await createStore({
        email,
        storePhone,
        password,
        website,
        firstName,
        lastName,
        storeName,
        street,
        province,
        city,
        postalCode,
        country
      });
      console.log("call register result", result)
      if( result ) {
        props.resetStore();
        navigate('/login');;
      } else {
        
        console.log("error registrating a store", error);
      }
  
    } catch (err) {

      console.log("error creating a store", err);
    }
    
   setLoading(false);

  
  }
  const [check, setCheck] = useState(false);
  const isEmpty = (errors, key) => {
  const result =  Object.keys(errors).length !== 0 && errors[key] !== undefined

  // console.log(`error - ${key} is`, result);
  return result
  
  }
  const inputProps = {
    disableUnderline: false,
    sise: 30
  }

  const onChangeValue = ( key , e) => {
    setErrors({});
    props.updateStore(key,e);
  }
  const label = ( <div> <span>I accept the </span> <Link onClick={() => {}}>terms of use</Link> <span> and </span> <Link to={'/privacy'}>privacy policy</Link> </div> )
    return (
      <Grid container justify="center" className="root" style={{height: '100%'}}>
      <Grid container item justify='center' alignItems="center" className="home" >
        <Grid container justify='center' >
          <h1>Hello</h1>
        </Grid>
      </Grid>
        
      <Grid container className="shell" item justify="center" alignItems="flex-start" style={{marginTop: '8%'}}>
      <Grid container className="center-box" direction="row" style={{borderRadius: 35, width: '70%'}}>
        <Grid item xs={false} sm={3}  className='image-signup' style={{borderBottomLeftRadius: 35, borderTopLeftRadius: 35}}>
        </Grid>
        <Grid container item xs={12} sm={9} justify="center" alignItems="center" >
          <form > 
          <h1 style={{marginTop: 70, marginBottom: 30, color: '#FFA500', fontWeight: 800 }}>Register</h1>
          <Grid  container style={{ width: 500}} justify="center" alignItems="center" >
          <Grid item xs={12} sm={6}  >
            <TextField
                label="Manager First Name"
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                InputProps={{style: {fontSize: 15}}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.firstName || ''}
                onChange={ e => {
                
                  onChangeValue('firstName', e.target.value)
                  
                }}
                error={check && isEmpty(errors, 'firstName')}
                helperText={isEmpty(errors, 'firstName')? errors.firstName : ''}
                
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField

                label="Manager Last Name"
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                InputProps={{style: {fontSize: 15}}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.lastName || ''}
                onChange={(e)=> {
                  onChangeValue('lastName', e.target.value)
                }}
                type="text"

                error={isEmpty(errors, 'lastName')}
                helperText={isEmpty(errors, 'lastName')? errors.lastName : ''}
  
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.email || ''}
                onChange={(e)=> onChangeValue('email', e.target.value)}
                label="Manager Email"
                error={isEmpty(errors,'email')}
                helperText={isEmpty(errors, 'email')? errors.email : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.storeName || ''}
                onChange={(e)=> onChangeValue('storeName', e.target.value)}
                type="text"
                label="Store Name"
                error={isEmpty(errors, 'storeName')}
                helperText={isEmpty(errors, 'storeName')? errors.storeName : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.storePhone || ''}
                onChange={(e)=> onChangeValue('storePhone', e.target.value)}
                type="text"
                label="Store Phone Number"
                error={isEmpty(errors, 'storePhone')}
                helperText={isEmpty(errors, 'storePhone')? errors.storePhone : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.website || ''}
                onChange={(e)=> onChangeValue('website', e.target.value)}
                label="Store Website"
                // error={isEmpty(errors, 'website')}
                // helperText={isEmpty(errors, 'website')? errors.website : ''}
              />
              </Grid>
              
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.password || ''}
                onChange={(e)=> onChangeValue('password', e.target.value)}
                type="password"
                label="Password"
                error={isEmpty(errors, 'password')}
                helperText={isEmpty(errors, 'password')? errors.password : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.repeatPassword || ''}
                onChange={(e)=> onChangeValue('repeatPassword', e.target.value)}
                label="Confirmed Password"
                type="password"
                error={isEmpty(errors, 'repeatPassword')}
                helperText={isEmpty(errors, 'repeatPassword')? errors.repeatPassword : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.storeEmail || ''}
                onChange={(e)=> onChangeValue('storeEmail', e.target.value)}
                label="Store Email"
                error={isEmpty(errors, 'storeEmail')}
                helperText={isEmpty(errors, 'storeEmail')? errors.storeEmail : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.street || ''}
                onChange={(e)=> onChangeValue('street', e.target.value)}
                label="Store Street Address"
                error={isEmpty(errors, 'street')}
                helperText={isEmpty(errors, 'street')? errors.street : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.city || ''}
                onChange={(e)=> onChangeValue('city', e.target.value)}
                label="City"
                error={isEmpty(errors, 'city')}
                helperText={isEmpty(errors, 'city')? errors.city : ''}
              />
              </Grid>
              <Grid item xs={12} sm={6} >

              <TextField
                label="Province"
                InputProps={{style: {fontSize: 15, textAlign: 'left'}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                select
                onChange={(e)=> onChangeValue('province', e.target.value)}
                value={props.restaurant.province || ''}
                error={isEmpty(errors, 'province ')}
                helperText={isEmpty(errors, 'province ')? errors.province  : ''}
              >
            
          
              <MenuItem value={'Ontario'} style={{textAlign: 'left', alignSelf: 'left'}} >Ontario</MenuItem>
              </TextField>
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                InputProps={{style: {fontSize: 15}}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.postalCode || ''}
                onChange={(e)=> onChangeValue('postalCode', e.target.value)}
                label="Postal Code"
                error={isEmpty(errors, 'postalCode')}
                helperText={isEmpty(errors, 'postalCode')? errors.postalCode : ''}
              />
                </Grid>
                <Grid item xs={12} sm={6} >
              <TextField
                InputProps={{style: {fontSize: 15}}}
                style={{ width: 200, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.country || ''}
                onChange={(e)=> onChangeValue('country', e.target.value)}
                label="Country"
                error={isEmpty(errors, 'country')}
                helperText={isEmpty(errors, 'country')? errors.country : ''}
              />
              </Grid>
              {/* <TextField
                InputProps={{style: {fontSize: 15}}}
                size="medium"
                variant="outlined"
                className={classes.input}
                value={props.restaurant.registrationCode || ''}
                onChange={(e)=> onChangeValue('registrationCode', e.target.value)}
                label="Registraion CODE"
                // error={isEmpty(errors, 'registrationCode')}
                // helperText={isEmpty(errors, 'registrationCode')? errors.registrationCode : ''}
              />
           */}
           <Grid item xs={12} sm={12} >
              <FormControlLabel
                className={classes.checkButton}
                control={<Checkbox style={{color:'#FFA500'}} value={accept} onClick={() => setAccept(!accept)}/>}

                label={label}
              />
            </Grid>
            <Grid item xs={12} sm={12} >
            <div style={{ textAlign: "center", marginTop: 30 }}>
            <Button
                disabled={loading}
                style={styles.onClickedButton}
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  const err = validations.signup(props);
                  console.log("errors ", err);
                if( Object.keys(err).length !== 0) {
                  setErrors(err);
                  setAccept(false);
                  setCheck(true);
                  console.log("return error", err)
                } else {
                  if(accept) {
                    onRegister(e)
                  }
                }}}
               >
                  <Typography variant="h6">{!loading ? 'Register' : 'Loading'}</Typography>
              </Button>
            </div>
            </Grid>
          </Grid>
      
        </form>
{/* 
        <Grid container direction="row" justify="center" alignItems='center' style={{marginBottom: 10}}>
          <Typography  variant="h6" style={{marginRight: 10}}>Don't have an account? </Typography> 
          <Typography  variant="h6" className="link" onClick={() => navigate('signup')}> Register Now</Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems='center' style={{marginBottom: 100}}>
          <Typography  variant="h6" style={{marginRight: 10}}>Forgot your password? </Typography> 
          <Typography  variant="h6" className="link" onClick={() => navigate('signup')}> Recover password</Typography>
        </Grid> */}

        </Grid>
      </Grid>
    </Grid>
  </Grid>
   
    );
  }

export default subscribe()(Signup);

