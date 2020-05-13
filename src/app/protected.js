import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
// import isLoggedIn from "../containers/localStore/isLoggedIn";
import firebase from "../firebase";
import { subscribe } from 'react-contextual';

const Protected = ({ component: Component, ...rest }) => {
  console.log("rest", ...rest)
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect( ()=> {
    try {
      setLoading(true);

      firebase.auth().onAuthStateChanged(userInfo => {
        if(userInfo)
          setLoggedIn(true);
        else 
          setLoggedIn(false);
      });
    } catch (error) {
      setLoading(false);
    }
  },[loading, loggedIn]);


  return (
    <Route
      {...rest}
      render={(props) => {
        if(loading)
          return props.history.push("/loading");
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return props.history.push("/login");
        }
      }}
    />
  );
};

export default subscribe()(Protected);
