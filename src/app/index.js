import React, { useEffect, useState } from "react";
import "typeface-roboto";

import { subscribe } from 'react-contextual';
import firebase from 'firebase';

import { useRoutes } from 'hookrouter';
import NotFound from '../app/layout/NotFound';
import Home from "../account/homePage";
import Login from "../account/login";
import OrdersSSS from "../orders";
import Signup from '../account/signup';
import Auth from './auth';
import Protected from './protected';


const App = (props) => {

  const [loggedIn , setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // console.log("current user", userInfo);

  // useEffect(() => {
  //     firebase.auth().onAuthStateChanged(async user => {
  //       if (user) {
  //         setLoggedIn(true);
  //         setLoading(false);
  //       } else {
  //         setLoggedIn(false);
  //         setLoading(false);
  //       }
  //     });
  // }, [loggedIn]);


  console.log("app--set loggedin", loggedIn);
  const routes = {
    '/': ()=> <Home/>,
    '/login': ()=> <Login/>,
    '/signup': ()=> <Signup/>,
    '/dashboard': ()=> <Protected component={OrdersSSS}/>
  }
  
  const Routes = useRoutes(routes);

  const path = window.location.pathname;

  console.log("App -- find", Routes);
  // if(loading) {
  //   return <></>
  // }

  if(!Routes)
    return <NotFound/>

  return <Auth isLoggedIn={loggedIn}>{Routes}</Auth> 
}
export default subscribe()(App);
