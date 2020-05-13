

export const updateStore = (key, value) => state => {
  let store = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    store = {
      ...state.store,
      ...dataToAppend
    };
  } else {
    store = {
      ...state.store,
      [key]: value
    };
  }

  return {
    store
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

