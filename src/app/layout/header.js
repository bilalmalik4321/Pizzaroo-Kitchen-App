import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { navigate } from 'hookrouter';
import { subscribe } from 'react-contextual';
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import firebase from 'firebase';

function checkPath(route) {
  const path = window.location.pathname.split('/')
  // console.log('path', path)
  if (path.length === 1) 
    return true 
  return path[1].includes(route)
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 10,
    // minWidth: 700
  },
  beforeButton: {
    marginRight: 20,
    marginLeft: 20,
    color: 'black'
  },

  onClickedButton :{
    marginRight: 20,
    marginLeft: 20,
    background: `linear-gradient(152.04deg, #FFA500 29.77%, #D97400 102.89%)`,
    borderRadius: 35,
    color: 'white'
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 40
  },

  AppBar: {
    height: 80,
    backgroundColor: 'white',
    padding: '10px 30px 10px 30px',
    color: "red",
  },
}));


 

const ButtonAppBar = props => {

  const { toggleStripe, toggleLogin, toggleHistory, toggleLogout,toggleOrders, toggleProfile ,toggleMenu, toggleSignOut, toggleSignUp} = props.restaurant;
  
  
  const classes = useStyles();

  return (
    // <div style={{ zIndex: 10, minWidth: 700}}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <div className={classes.title}>
            <img src={require("../../_assets/eatco.png")} className={classes.logo}

              onClick={()=> navigate('/')}
            />
            {/* <Typography variant="h4" className={classes.title}>
              Pizzaroo
            </Typography> */}
          </div>
          {toggleOrders && <div onClick={() => navigate('/order')}>
            <Button 
              className={checkPath('order') ? classes.onClickedButton : classes.beforeButton}
             
              >
              <Typography variant="h6">Orders</Typography>
            </Button>
          </div>
          }
          {toggleMenu && <div onClick={() => navigate('/menu')}>
            <Button 
              className={checkPath('menu') ? classes.onClickedButton : classes.beforeButton}
          
              >
              <Typography variant="h6">Menu</Typography>
            </Button>
          </div>
          }

          {toggleStripe && <div onClick={() => {
            
            navigate('/connect')
            
          }}>
          <Button 
            className={checkPath('connect') ? classes.onClickedButton : classes.beforeButton}
        
            // onClick={()=>navigate('/login')}
            >
            <Typography variant="h6">Connect Stripe</Typography>
          </Button>
          </div>
          }

          {toggleHistory && <div onClick={() => {
            
            navigate('/history')
            
          }}>
          <Button 
            className={checkPath('history') ? classes.onClickedButton : classes.beforeButton}
  
            >
            <Typography variant="h6">Past Orders</Typography>
          </Button>
          </div>
          }
         
         
        
          {toggleLogin && <div onClick={() => navigate('/login')}>
          <Button 
            className={(checkPath('login') || checkPath('home')) ? classes.onClickedButton : classes.beforeButton}

            >
            <Typography variant="h6">Login</Typography>
          </Button>
          </div>
          }


          {toggleSignUp && <div onClick={() => navigate('/signup')}>
          <Button 
            className={checkPath('signup') ? classes.onClickedButton : classes.beforeButton}
          
            // onClick={navigate('/signup')}
             >
            <Typography variant="h6">Signup</Typography>
          </Button>
          </div>}
         

          {toggleSignOut && <div onClick={() => {
            
            firebase.auth().signOut();
            props.resetStore()
            navigate('/')
            
          }}>
          <Button 
            className={checkPath('signout') ? classes.onClickedButton : classes.beforeButton}
           
            // onClick={()=>navigate('/login')}
            >
            <Typography variant="h6">Sign Out</Typography>
          </Button>
          </div>
          }

          {toggleProfile && <div>
           <IconButton
                style={{ width: 64, height: 64, padding: 0 }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=> {}}
                color="inherit"
              >
                <AccountCircle style={{ width: 32, height: 32 }} />
              </IconButton>
          </div>}
        </Toolbar>
      </AppBar>
    // </div>
  );
}
export default subscribe()(ButtonAppBar);
