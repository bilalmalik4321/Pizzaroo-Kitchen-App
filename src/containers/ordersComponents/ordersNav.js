import React from "react";
import fire from "../../firebase";
//import history from "../History";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Profile from "../profile";
import store from "store";

function logout() {
  fire.auth().signOut();
  store.clearAll();
}

function direct() {
  window.location.href = "/login";
}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#FBFF12",
    color: "#2D2A32",
  },
}));

export default function OrdersNav(props) {
  const classes = useStyles();
  logout = logout.bind(this);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Pizzaroo
            </Typography>

            <div>
              <IconButton
                style={{ width: 64, height: 64, padding: 0 }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ width: 32, height: 32 }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Profile />
                <MenuItem
                  onClick={() => {
                    logout();
                    direct();
                  }}
                >
                  <Typography variant="h5">Logout</Typography>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
