import React, { useEffect, useState } from 'react';


import { subscribe } from 'react-contextual';
import firebase from 'firebase';
import NotFound from './layout/NotFound';
import { getStore } from '../api';

const Auth = (props) => {
  const { updateStore} = props;
  const [loggedIn , setLoggedIn] = useState(props.isLoggedIn)
 
  console.log("props", props);
  console.log('loggedIn in auth from app', props.isLoggedIn);

  const [accessProcted, setAccess] = useState(false);

  const needLogin = [
    '/dashboard',
    '/profile'
  ]

  useEffect(() => {
      try {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
            setLoggedIn(true);
            console.log("hello",user)
            const { emailVerified } = user;
            const userDetails = await getStore(user.uid);
            if (!loggedIn)
              props.updateStore({
                loggedIn: true,
                ...userDetails,
                emailVerified
              });
          } else {
            props.updateStore('loggedIn', false);
          }
        });
      } catch (err) {
        props.updateStore('loggedIn', false);
      }
  }, [loggedIn, props.updateStore]);

  console.log('loggedin -- restaurant******', props.restaurant.loggedIn,'path',window.location.pathname.toLowerCase(), 'window path true?', !loggedIn && needLogin.includes(window.location.pathname.toLowerCase()))
  if( !loggedIn && needLogin.includes(window.location.pathname.toLowerCase()))
    return <NotFound/>

  return <>{props.children}</>;
}

export default subscribe()(Auth);
