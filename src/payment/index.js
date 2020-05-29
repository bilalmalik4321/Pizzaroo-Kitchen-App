import React, {useEffect, useState} from 'react';
import { subscribe } from 'react-contextual';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import firebase from 'firebase';
import { getStore, callCloudFunctions } from '../api';

const Payment = props => {
   
  // console.log("props params -----", props);
  const query = new URLSearchParams(window.location.search);
  const [loading, setLoading ] = useState(false);
  const { stripe_connected_account_id } = props.restaurant;
  console.log("account ----", stripe_connected_account_id)
 
  const onRequest = async () => {
    setLoading(true);
   
    const redirect_uri = window.location.origin + '/auth';

    await firebase.auth().currentUser.getIdToken(true).then(async idToken => {
      const result = await callCloudFunctions(window.location.href,'getAuthLink',{
        customToken: idToken,
        redirect_uri
      })

      console.log("result-------", result);
      window.location = result.url

    }).catch( error =>{
      console.log('failed to get ID',error)
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
