import * as actions from './actions';

export default {
  restaurant: {
    storeId: '',
    description:'',
    firstName: '',
    lastName: '',
    storeName: '',
    storePhone: '',
    email: '',
    password: '',
    repeatPassword: '',
    website: '',
    address: '',
    street: '',
    province:'Ontario',
    city: '',
    postalCode: '',
    country: 'Canada',
    registrationCode: '',
    loading: true,
    loggedIn: false,
    menu: {
      pizzas: [],
      desserts: [],
      sides: [],
      dippings: [],
      drinks: []
    },
    hour: {
    },
    toggleLogin: true,
    toggleLogout: false, 
    toggleProfile: false, 
    toggleMenu: false, 
    toggleSignUp: true,
    toggleOrders: false,
    toggleSignOut: false,
    toggleMenu: false,
    toggleStripe: false

  },
  menu: {

  },
  orders: {
    loading: true,
  },
  ...actions
}
