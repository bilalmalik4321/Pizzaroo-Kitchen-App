import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
// import isLoggedIn from "../containers/localStore/isLoggedIn";
import firebase from "../firebase";
import { subscribe } from 'react-contextual';
import { getStore } from "../api";
import history from './historyRoutes';
const Protected = subscribe()(props => {

  const { component: Component, ...rest } = props;
  console.log("props protected------", props);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = props.restaurant;

  console.log("loggedIn",loggedIn);
  if(loggedIn)
  {
    history.push(props.path);
  }
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
