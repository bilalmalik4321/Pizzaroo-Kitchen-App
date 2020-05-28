import React, { useState, useEffect } from 'react';
import { subscribe } from 'react-contextual';
import axios from 'axios';
import { navigate } from 'hookrouter';
import { getStore } from '../api';
import firebase from '../firebase';
const Confirm = props => {

  const [loading, setLoading] = useState(false);
  const [incorrectCode, setIncorrectCode] = useState(false);
 
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  const state = query.get('state');

  const updateUser = async (uid)=> {
    const userInfo = await getStore(uid);
    props.updateStore({...userInfo});
  }

  const verify = async (code, state) => {
    setLoading(true);
    try {
      const verifyData = await axios.post(`https://us-central1-pizzaro-staging.cloudfunctions.net/confirmAuth`,{
        code,
        state});
  
      const { isConnected, response, error, uid } = verifyData.data;
    
      console.log("hi",  verifyData.data)
      if(isConnected){

        await firebase.firestore().collection('stores').doc(uid).set({ stripe_connected_account_id: response.stripe_user_id}, { merge: true})
        updateUser(uid);
        navigate('/connect')
      }
      else {
        setIncorrectCode(true);
      }
      
     
    } catch( error ) {
      setIncorrectCode(true);
      console.log("failed", error);
    }
    


    
    setLoading(false);
  
  
  }

  useEffect(() => {
   
    if( state && code ) {
      verify(code,state);
    }
  
  }, [])
   

  return(
    <>
    { incorrectCode ? 
      <h1>Invalid authorization code</h1>
      :
     <h1>Loading</h1>
    }
    </>
  )
}

export default subscribe()(Confirm);
