import React, { useEffect, useState } from 'react';


import { subscribe } from 'react-contextual';
import firebase from 'firebase';
import NotFound from './layout/NotFound';
import { getStore } from '../api';

const Auth = (props) => {
  
  const [loggedIn , setLoggedIn] = useState(props.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const needLogin = [
    '/dashboard',
    '/profile'
  ]
  useEffect(() => {
      try {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
            setLoading(false);
            setLoggedIn(true);
            console.log("hello",user)
            const { emailVerified } = user;
            const userDetails = await getStore(user.uid);
            if (!loggedIn)
              props.updateStore({
                loggedIn: true,
                ...userDetails,
                emailVerified,
                toggleLogin: false,
                toggleLogout: true, 
                toggleProfile: true, 
                toggleMenu: true, 
                toggleSignUp: false,
                toggleSignOut: true,
                toggleOrders: true,
                toggleMenu: true

              });
          } else {
            setLoading(false);
            setLoggedIn(false);
            props.updateStore('loggedIn', false);
          }
        });
      } catch (err) {
        props.updateStore('loggedIn', false);
      }
  }, [loggedIn, props.updateStore]);

  if(loading)
    return <></>;

  if( !loggedIn && needLogin.includes(window.location.pathname.toLowerCase()))
    return <NotFound/>

  return <>{props.children}</>;
}

export default subscribe()(Auth);
