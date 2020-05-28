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
 

  const updateUser = async ()=> {
    const userInfo = await getStore();
    props.updateStore({...userInfo});
  }

  console.log("props params -----", query.get('code'));
  const onRequest = async () => {
    setLoading(true);
   
    await firebase.auth().currentUser.getIdToken(true).then(async idToken => {
      const result = await callCloudFunctions(`https://us-central1-pizzaro-staging.cloudfunctions.net/getAuthLink`,{
        customToken: idToken + '12'
      })

      console.log("result", result);
      window.location = result.url

    }).catch( error =>{
      console.log('failed to get ID',error)
    }
    )
    setLoading(false);

    
  }
  const callCloudFunctions = async (url, params = {} ) => {
    try {
      const res = await axios.post(url, {...params});

      if(res.status!== 200 || !res.data)
        return false;
      return res.data;
    } catch ( err ) {
      console.log("error get Auth link", err);
      return false;
    }
  }

    return(
      <Grid container direction="row" justify="center">
        <Grid xs item>
          <h1>Profile</h1>
        </Grid>

        { !stripe_connected_account_id ? <Grid xs container item justify="center" direction="column">

          <Button
            loading={loading.toString()}
            disabled={loading}
           style={{ height: 50}}
            onClick={() => onRequest()}
            variant="contained"
            color="secondary"
          >Set up payouts</Button>
          <p> You'll be redireced to stripe to complete the onboarding process</p>
        </Grid>
      :
        <Grid xs container item justify="center" direction="column">

          <Button
          loading={loading.toString()}
          disabled={loading}
            style={{ height: 50}}
            variant="contained"
            color="primary"
          >Stripe is connected</Button>
          <h1>Stripe account is : {stripe_connected_account_id} </h1>
        </Grid>
        }
      </Grid>
    )

}


export default subscribe()(Payment);
