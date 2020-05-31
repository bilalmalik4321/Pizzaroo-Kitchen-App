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
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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

  const { toggleStripe, toggleLogin, toggleLogout,toggleOrders, toggleProfile ,toggleMenu, toggleSignOut, toggleSignUp} = props.restaurant;

  const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ width: 64, height: 64, padding: 0}}
          >
            <MenuIcon style={{ width: 24, height: 24 }}  />
          </IconButton>
          <LinkContainer to="/">
            <Typography variant="h4" className={classes.title}>
              Pizzaroo
            </Typography>
          </LinkContainer>

          {toggleSignUp && <div onClick={() => navigate('/signup')}>
          <Button
            style={{ marginLeft: 20, marginRight: 20}}
            variant="contained"
            color="primary"
            // onClick={navigate('/signup')}
             >
            <Typography variant="h6">Signup</Typography>
          </Button>
          </div>}

          {toggleLogin && <div onClick={() => navigate('/login')}>
          <Button
            style={{ marginLeft: 20, marginRight: 20}}
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
            style={{ marginLeft: 20, marginRight: 20}}
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
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
             <ChevronLeftIcon style={{ width: 24, height: 24 }} />
          </IconButton>
        </div>
        <Divider />
        <List>

            <ListItem button >
            {toggleOrders && <div onClick={() => navigate('/order')}>
              <Button
                  style={{ marginLeft: 20, marginRight: 20}}
                variant="contained"
                color="primary"
                >
                <Typography variant="h6">Orders</Typography>
              </Button>
            </div>
            }
            </ListItem>
            <ListItem button >
            {toggleMenu && <div onClick={() => navigate('/menu')}>
              <Button
                style={{ marginLeft: 20, marginRight: 20}}
                variant="contained"
                color="primary"
                >
                <Typography variant="h6">Menu</Typography>
              </Button>
            </div>
            }
            </ListItem>
            <ListItem button >
            {toggleStripe && <div onClick={() => {

              navigate('/connect')

            }}>
            <Button
              style={{ marginLeft: 20, marginRight: 20}}
              variant="contained"
              color="primary"
              // onClick={()=>navigate('/login')}
              >
              <Typography variant="h6">Connect Stripe</Typography>
            </Button>
            </div>
            }
            </ListItem>
        </List>

      </Drawer>
    </div>
  );
}
export default subscribe()(ButtonAppBar);
