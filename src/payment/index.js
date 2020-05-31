import React, {useEffect, useState} from 'react';
import { subscribe } from 'react-contextual';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import firebase from 'firebase';
import { getStore, callCloudFunctions } from '../api';

const Payment = props => {

  // console.log("props params -----", props);
  const query = new URLSearchParams(window.location.search);
  const [loading, setLoading ] = useState(false);
  const [loadingDelete, setLoadingDelete ] = useState(false);
  const [loadingExpress, setLoadingExpress ] = useState(false);
  const { stripe_connected_account_id } = props.restaurant;
  console.log("account ----", stripe_connected_account_id)
  const updateUser = async (uid)=> {
    const userInfo = await getStore(uid);
    props.updateStore({...userInfo});
  }

  const onGetLink = async () => {
    setLoadingExpress(true)
    const redirect_url = window.location.origin + '/connect';
    const result = await callCloudFunctions(window.location.href,'getExpressLoginLink',{
      connectedAccount: stripe_connected_account_id,
      redirect_url
    })
    console.log("result login link", result)
    if(result) {

      window.location = result.url
      setLoadingExpress(false)
    }
    setLoadingExpress(false)
  }
  const onDelete =  async () => {
    setLoadingDelete(true);
    const { uid } = firebase.auth().currentUser;
    try {
      await firebase.firestore().doc(`stores/${uid}`).update({
        stripe_connected_account_id : '',
        isConnectedWithStripe: false
      });

      updateUser(uid);
    } catch (e) {
      console.log(e)
    }
    setLoadingDelete(false);

  }
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
      setLoading(false);
    }).catch( error =>{
      console.log('failed to get ID',error)
      setLoading(false);
    })


  }

    useEffect(()=>{
      if(stripe_connected_account_id)
        setLoadingDelete(false);
    },[stripe_connected_account_id ]);

    return(
      <Container maxWidth="lg">
      <Grid container direction="row" justify="center">
        <Grid xs item>
          <h1>Stripe Profile</h1>
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
            onClick={()=> onGetLink()}
            loading={loadingExpress.toString()}
            disabled={loadingExpress}
            style={{ height: 50}}
            variant="contained"
            color="primary"
          >Click here to Payout to your Bank account</Button>
          <h1>Stripe account is : {stripe_connected_account_id} </h1>

          <Button
            onClick={() => onDelete()}
            loading={loadingDelete.toString()}
            disabled={loadingDelete}
              style={{ height: 50}}
              variant="contained"
              color="secondary"
            >Delete stripe account id from database</Button>
        </Grid>
        }
      </Grid>
      </Container>
    )

}


export default subscribe()(Payment);
