import React from 'react';
import { Link } from "react-router-dom";
import fire from "../firebase";
import history from "./History";
import Login from "./Login";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LinkContainer } from "react-router-bootstrap";
import Routes from "../Routes";


const useStyles = makeStyles(

  (theme) => ({
	  
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
      backgroundColor:"purple",
    },
	
  })
  
);

export default function ButtonAppBar() {
	
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      <AppBar position = "static" className = {classes.AppBar}>
        <Toolbar>
		
          <LinkContainer to = "/">
            <Typography variant="h4" className = {classes.title}>
              Pizzaroo
            </Typography>
          </LinkContainer>
          
          <Button variant = "contained" color = "primary" href = "/login">
            <Typography variant = "h6">
              Login
            </Typography>
          </Button>
		  
        </Toolbar>
      </AppBar>
      <Routes />
    </div>
  );
}
