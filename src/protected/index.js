import React from "react";
import { Route } from "react-router-dom";
import isLoggedIn from "../containers/localStore/isLoggedIn";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn()) {
          return <Component {...props} />;
        } else {
          return props.history.push("/login");
        }
      }}
    />
  );
};
