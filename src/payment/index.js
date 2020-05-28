import React, {useEffect, useState} from 'react';
import { subscribe } from 'react-contextual';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from 'axios';

import firebase from 'firebase';
import { getStore } from '../api';
const Payment = props => {
   
  // console.log("props params -----", props);
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  const state = query.get('state');
  const [loading, setLoading ] = useState(false);
  const [hasConnected, setHasConnected] = useState(false);
  const [profile, setProfile] = useState('');
  const [beginConnect, setBeginConnect] = useState(false);
  const { stripe_connected_account_id } = props.restaurant;
  console.log("account ----", stripe_connected_account_id)
  const verify = async (code, state) => {

    try {
      const verifyData = await axios.post(`http://localhost:5001/pizzaro-staging/us-central1/confirmAuth`,{
        code,
        state});
  
      const { isConnected, response, error } = verifyData.data;
      setProfile(response.stripe_user_id);
      setHasConnected(isConnected);
      console.log("hi",  verifyData.data)
    } catch( error ) {
      console.log("failed", error);
    }
   
    // }).then( hi => {
    //   const { isConnected, response, error } = hi.data;
    //   setProfile(response.stripe_user_id);
    //   setHasConnected(isConnected);
    //   console.log("hi", hi)
    // }).catch( error => {
    //   console.log("what is the error", error.message)
    // })

    
  }

  const updateUser = async ()=> {
    const userInfo = await getStore();
    props.updateStore({...userInfo});
  }
  useEffect(() => {
   
    if( state && code ) {
      console.log("code:\n ", code ,'\n\nstate: \n',state ,'\n\n')
      verify(code,state);
      // updateUser();
    }
 
   
  }, [])
   
  console.log("props params -----", query.get('code'));
  const onRequest = async () => {
    setLoading(true);
   
    await firebase.auth().currentUser.getIdToken(true).then(async idToken => {
      const result = await axios.post(`http://localhost:5001/pizzaro-staging/us-central1/getAuthLink`,{
        customToken: idToken
      })

      // console.log("result", result);
      window.location = result.data.url

    }).catch( error =>{
      console.log('failed to get ID')
    }
    )
    setLoading(false);

    
  }
    return(
      <Grid container direction="row" justify="center">
        <Grid xs item>
          <h1>Profile</h1>
        </Grid>

        { !stripe_connected_account_id ? <Grid xs container item justify="center" direction="column">

          <Button
            onClick={() => onRequest()}
            variant="contained"
            color="secondary"
          >Set up payouts</Button>
          <p> You'll be redireced to stripe to complete the onboarding process</p>
        </Grid>
      :
        <Grid xs container item justify="center" direction="column">

          <Button
       
            variant="contained"
            color="primary"
          >Stripe is connected</Button>
          <h1>{stripe_connected_account_id} </h1>
        </Grid>
        }
      </Grid>
    )

}


export default subscribe()(Payment);
