import { getOrders } from '../api';

export const updateStore = (key, value) => state => {
  let restaurant = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    restaurant = {
      ...state.restaurant,
      ...dataToAppend
    };
  } else {
    restaurant = {
      ...state.restaurant,
      [key]: value
    };
  }

  return {
    restaurant
  };
};


export const updateMenu = (key, value) => state => {
  let menu = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    menu = {
      ...state.menu,
      ...dataToAppend
    };
  } else {
    menu = {
      ...state.menu,
      [key]: value
    };
  }

  return {
    menu
  };
};


export const clearMenu = () => state => {
  return {
    menu: {}
  };
};

/**
 * This functions retrieve order from the firestore 
 **/

export const getCustomerOrders = () => async (state) => {
  try {
  // console.log("cannot find user-----", state.user)
  state.setState({
    orders: {
      ...state.orders,
      loading: true
    }
  });
	// console.log("cannot find user", state.user)
  await getOrders(
    async (incomings) => {
      state.setState({
        orders: {
          ...state.orders,
          incomings,
          loading: false
        }
      })
    }
  )} catch (err) {
    console.log("***", err)
  }
}
export const updateOrders = (key, value) => state => {
  let orders = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    orders = {
      ...state.orders,
      ...dataToAppend
    };
  } else {
    orders = {
      ...state.orders,
      [key]: value
    };
  }

  return {
    orders
  };
};
