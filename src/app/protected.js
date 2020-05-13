// import React, { useEffect, useState } from "react";
// import { Route } from "react-router-dom";
// // import isLoggedIn from "../containers/localStore/isLoggedIn";
// import firebase from "../firebase";
// import { subscribe } from 'react-contextual';
// import { getStore } from "../api";
// import history from './historyRoutes';
// const Protected = subscribe()(props => {

//   const { component: Component, ...rest } = props;
//   console.log("props protected------", props);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       setLoading(true);

//       firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//           setLoggedIn(true);
//         } else {
//           setLoggedIn(false);
//         }
//       });

//     } catch (err) {
//       setLoggedIn(false);
//       // navigate('/account/login');
//       // console.log(err);
//     }

//     setLoading(false);
//   }, []);

//   console.log("loggedIn--------$$$", loggedIn);

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (loggedIn) {
//           console.log("go to order")
//           return <Component {...props} />;
//         } else {
//           console.log("go to home")
//           return props.history.push("/login");
//         }
//       }}
//     />
//   );
// });

// export default Protected;
import React, { useState, useEffect } from 'react';
import { navigate } from 'hookrouter';
import firebase from 'firebase';
import NotFound from './layout/NotFound';
import { subscribe } from 'react-contextual';

const Protected = (props) => {
  const { params } = props;
  const [loggedIn, setLoggedIn] = useState(props.restaurant.loggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });

    } catch (err) {
      setLoggedIn(false);
      navigate('/login');
    }

    setLoading(false);
  }, []);

  console.log("protected", loggedIn);
  const component = loading ? <></> : <props.component params={params} />;

  // if (!loggedIn && !loading ) return <NotFound/>;

  return loggedIn && !loading ? component : <></>;
}

export default subscribe()(Protected);
