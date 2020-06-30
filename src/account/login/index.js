import React, {  useState } from "react";
import Typography from "@material-ui/core/Typography";
import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { subscribe } from 'react-contextual';
import { navigate } from 'hookrouter';

import './index.css';
import styles from "../style";
import { getStore } from "../../api";
import firebase from "../../firebase";

// override textfield properties
const makeCSS = makeStyles({
  root: {
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500"
    }
  }
});


/**
 * Login screen allows user to login
 * @param {Object} props - HOC of the store state
 */
function Login(props) {
  
  const classes = makeCSS();
  const [errorMessage, setError] = useState({});
  // on login action
  async function onLogin(e) {
    try {
      props.updateStore({loading: true})
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(props.restaurant.email,props.restaurant.password)
        .then( async userInfo => {
          console.log("after login in userInfo", userInfo);
          if(userInfo) {
            const user = await getStore(userInfo.user.uid);
            props.updateStore({
              ...user,
              loggedIn: true, 
              loading: false,
              toggleLogin: false,
              toggleLogout: true, 
              toggleProfile: true, 
              toggleSignUp: false,
              toggleSignOut: true,
              toggleOrders: true,
              toggleMenu: true,
              toggleStripe: true,
              toggleHistory: true
            });
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
      <Grid container justify="center" className="root" style={{height: '100%'}}>
        {/* <div className="home">
        </div> */}
       
        <Grid container item justify='center' alignItems="center" className="home" >
          <Grid container justify='center' >
            <h1> HELLO</h1>
          </Grid>
        </Grid>
          
        <Grid container className="shell" item justify="center" alignItems="flex-start" style={{marginTop: '8%', height: 550}}>
        <Grid container className="center-box" direction="row" style={{borderRadius: 35, width: '60%',height: 550}}>
          <Grid item xs={3}  className='image' style={{borderBottomLeftRadius: 35, borderTopLeftRadius: 35,height: 550}}>
          </Grid>
          <Grid item xs={9}>
            <form > 
            <h1 style={styles.logoText}>Login</h1>
            <Grid  container direction="column"  justify="center" alignItems='center' >
              <Grid item xs >
                <TextField
                  inputProps={{
                    style: {fontSize: 15} 
                  }}
                  className={classes.root}
                  style={{ width: 300, marginTop: 20 , minWidth: 50 , borderColor: '#FFA500'}}
                  label="Email"
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
                  inputProps={{
                    style: {fontSize: 15} 
                  }}
                  className={classes.root}
                  style={{ width: 300, marginTop: 20 ,marginBottom: 20, minWidth: 50}}
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
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Button
                style={styles.onClickedButton}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  let err = validate(props);
                  if(Object.keys(err).length === 0)
                    onLogin(e)
                  else
                    setError(err)
                }}
              >
                <Typography variant="h6">Login</Typography>
              </Button>
            </div>
          </form>
          <Grid container direction="row" justify="center" alignItems='center' style={{marginBottom: 10}}>
            <Typography  variant="h6" style={{marginRight: 10}}>Don't have an account? </Typography> 
            <Typography  variant="h6" className="link" onClick={() => navigate('signup')}> Register Now</Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems='center' style={{marginBottom: 100}}>
            <Typography  variant="h6" style={{marginRight: 10}}>Forgot your password? </Typography> 
            <Typography  variant="h6" className="link" onClick={() => navigate('signup')}> Recover password</Typography>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default subscribe()(Login);


// check if an object is empty
function isEmpty(errors, key) {
  const result =  Object.keys(errors).length !== 0 && errors[key] !== undefined
  return result
}
// validate data
function validate(props) {
  const { email, password } = props.restaurant;
  let error = {};
  if(!email || email.lenght < 6 ) error.email = "Enter a valid email.";
  if(!password || password.length < 6) error.password = "Enter a valid password.";
  return error;
}
