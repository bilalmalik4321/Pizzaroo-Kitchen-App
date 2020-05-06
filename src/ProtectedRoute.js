import React from "react";
import { Route } from "react-router-dom";
import firebase from "./firebase";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            return <Component {...props} />;
          } else {
            return props.history.push("/login");
          }
        });
      }}
    />
  );
};
