import React from 'react';
import Navbar from './ordersNav';
import HeaderBar from './header';


const Wrapper = props => {

  return(
    <div>
      <HeaderBar/>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Wrapper;
