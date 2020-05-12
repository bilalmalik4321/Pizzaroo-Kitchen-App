import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../account/Home";
import NotFound from "../layout/NotFound";
import Login from "../account/login";
import Orders from "../orders/Orders";
import { ProtectedRoute } from "../protected";
import Signup from '../account/signup';
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup}/>
      <ProtectedRoute exact path="/Orders" component={Orders} />
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
