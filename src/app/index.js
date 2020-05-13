import React from "react";
import "typeface-roboto";
import { useRoutes } from 'hookrouter';
import NotFound from '../app/layout/NotFound';
import Home from "../account/homePage";
import Login from "../account/login";
import OrdersSSS from "../orders";
import Signup from '../account/signup';
import Auth from './auth';
import Protected from './protected';


const App = () => {

  const routes = {
    '/': ()=> <Home/>,
    '/login': ()=> <Login/>,
    '/signup': ()=> <Signup/>,
    '/dashboard': ()=> <Protected component={OrdersSSS}/>
  }
  
  const Routes = useRoutes(routes);

  if(!Routes)
    return <NotFound/>

  return <Auth>{Routes}</Auth> 
}
export default App;
