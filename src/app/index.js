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
import Wrapper from './layout';
import Order from '../orders/newIndex';
import Menu from '../menu';
import Payment from '../payment';

const App = () => {

  const routes = {
    '/': ()=> <Home/>,
    '/login': ()=> <Login/>,
    '/signup': ()=> <Signup/>,
    '/dashboard': ()=> <Protected component={OrdersSSS}/>,
    '/order': ()=> <Protected component={Order}/>,
    '/menu': ()=> <Protected component={Menu}/>,
    '/connect': ()=> <Protected component={Payment}/>
  }
  
  const Routes = useRoutes(routes);

  if(!Routes)
    return <Wrapper><NotFound/></Wrapper>

  return <Auth><Wrapper>{Routes}</Wrapper></Auth> 
}
export default App;
