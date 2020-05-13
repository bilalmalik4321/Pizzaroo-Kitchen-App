import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
// import isLoggedIn from "../containers/localStore/isLoggedIn";
import firebase from "../firebase";
import { subscribe } from 'react-contextual';

const Protected = subscribe()(props => {

  const { component: Component, ...rest } = props;
  console.log("props protected", props);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = props.restaurant;

  useEffect(()=> {
    try {
      setLoading(true);
      firebase.auth().onAuthStateChanged(userInfo => {
        console.log("user proctected", userInfo);
        if(userInfo)
          props.updateStore({loggedIn: true})
        else 
        props.updateStore({loggedIn: false})
      });
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);

  },[loggedIn, loading]);

  console.log("loggedIn", loggedIn);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          console.log("go to order")
          return <Component {...props} />;
        } else {
          console.log("go to home")
          return props.history.push("/login");
        }
      }}
    />
  );
});

export default Protected;
