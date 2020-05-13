import React, { Component, useEffect, useState } from "react";
import "typeface-roboto";
import Routes from "./routes";
import { subscribe } from 'react-contextual';
import firebase from '../firebase';
import { getStore } from '../api';
const App = (props) => {

  return (
    <Routes />
  )
}
export default subscribe()(App);
