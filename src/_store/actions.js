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

