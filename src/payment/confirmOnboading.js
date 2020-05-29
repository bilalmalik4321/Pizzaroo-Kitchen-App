import React, { useState, useEffect } from 'react';
import { subscribe } from 'react-contextual';
import { navigate } from 'hookrouter';
import { getStore, callCloudFunctions } from '../api';
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
      const verifyData = await callCloudFunctions(window.location.href,`confirmAuth`,{
        code,
        state});
  
      const { isConnected, response, uid } = verifyData;
    
      console.log("hi",  verifyData)
      if(verifyData && isConnected){
        await firebase.firestore().collection('stores').doc(uid).set({ 
          stripe_connected_account_id: response.stripe_user_id,
          isConnectedWithStripe: true
        }, { merge: true})
        updateUser(uid);
    
      }
      else {
        setIncorrectCode(true);
      }
      
     
    } catch( error ) {
      setIncorrectCode(true);
      console.log("failed", error);
    }
    


   
    setLoading(false);
    navigate('/connect')
  
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
