import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { LinkContainer } from "react-router-bootstrap";
import { navigate } from 'hookrouter';
import { subscribe } from 'react-contextual';
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#FBFF12",
    color: "#2D2A32",
  },
}));


 

const ButtonAppBar = props => {

  const { toggleLogin, toggleLogout,toggleOrders, toggleProfile ,toggleMenu, toggleSignOut, toggleSignUp} = props.restaurant;
  
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <LinkContainer to="/">
            <Typography variant="h4" className={classes.title}>
              Pizzaroo
            </Typography>
          </LinkContainer>
          {toggleOrders && <div onClick={() => navigate('/order')}>
            <Button 
              variant="contained" 
              color="primary"
              >
              <Typography variant="h6">Orders</Typography>
            </Button>
          </div>
          }
          {toggleMenu && <div onClick={() => navigate('/menu')}>
            <Button 
              variant="contained" 
              color="primary"
              >
              <Typography variant="h6">Menu</Typography>
            </Button>
          </div>
          }
         
         
          {toggleSignUp && <div onClick={() => navigate('/signup')}>
          <Button 
            variant="contained" 
            color="primary"
            // onClick={navigate('/signup')}
             >
            <Typography variant="h6">Signup</Typography>
          </Button>
          </div>}
         
          {toggleLogin && <div onClick={() => navigate('/login')}>
          <Button 
            variant="contained" 
            color="primary"
            // onClick={()=>navigate('/login')}
            >
            <Typography variant="h6">Login</Typography>
          </Button>
          </div>
          }

          {toggleSignOut && <div onClick={() => {
            
            firebase.auth().signOut();
            props.resetStore()
            navigate('/')
            
          }}>
          <Button 
            variant="contained" 
            color="primary"
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
    </div>
  );
}
export default subscribe()(ButtonAppBar);
