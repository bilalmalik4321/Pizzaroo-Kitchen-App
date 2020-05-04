import React from 'react';
import { Link } from "react-router-dom";
import fire from "../firebase";
import history from "./History";
import Login from "./Login";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';


function logout() {
    fire.auth().signOut();
  }
  
function direct() {
    history.push("Login");
  }
  
const useStyles = makeStyles(
	(theme) => ({
		root: {
			flexGrow: 1,
		},
		title: {
			flexGrow: 1,
		},
		AppBar: {
			backgroundColor:"purple",
		},
	})
);

export default function Orders() {
	
	const [expanded, setExpanded] = React.useState('panel1');

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const classes = useStyles();
	logout = logout.bind(this);
	history.push("Orders");
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className = {classes.root}>
			<div>
				<AppBar position = "static" className = {classes.AppBar}>
					<Toolbar>

						<Typography variant = "h4" className = {classes.title}>
							Pizzaroo
						</Typography>
          
							<div>
								<IconButton
									style = {{width: 64, height: 64, padding: 0,}}
									aria-label = "account of current user"
									aria-controls = "menu-appbar"
									aria-haspopup = "true"
									onClick = {handleMenu}
									color = "inherit"
								>
									<AccountCircle style = {{ width: 32, height: 32,}}  />
								</IconButton>
			
								<Menu
									id = "menu-appbar"
									anchorEl = {anchorEl}
									anchorOrigin = {{
										vertical: 'top',
										horizontal: 'right',
									}}							
									keepMounted
									transformOrigin = {{
										vertical: 'top',
										horizontal: 'right',
									}}							
									open = {open}
									onClose = {handleClose}
								>
									<MenuItem onClick = {handleClose}>
										<Typography variant = "h5">
											Profile
										</Typography>
									</MenuItem>
									<MenuItem 
										onClick = {
											() => {
												logout();
												direct();
											}
										}
									>
										<Typography variant = "h5">
										Logout
										</Typography>
									</MenuItem>
									
								</Menu>
							</div>
          
					</Toolbar>
				</AppBar>
			</div>
			<div>
				<Container maxWidth = "lg" style = {{marginTop:20}}>
					<Grid container spacing = {3}>
					
						<Grid item xs = {4}>
							<Card variant = "outlined">
								<CardContent>
									<Typography color = "textSecondary" variant = "h4" gutterBottom>
										Pending Orders
									</Typography>
									<Typography variant = "h5">
										4
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						
						<Grid item xs = {4}>
							<Card variant = "outlined">
								<CardContent>
									<Typography color = "textSecondary" variant = "h4" gutterBottom>
										Preparing Orders
									</Typography>
									<Typography variant = "h5">
										2
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						
						<Grid item xs = {4}>
							<Card variant = "outlined">
								<CardContent>
									<Typography color = "textSecondary" variant = "h4" gutterBottom>
										Completed Orders
									</Typography>
									<Typography variant = "h5">
										8
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						
					</Grid>
					
					
					
					<Divider style = {{marginTop:25, marginBottom:25}} />
					
						<ExpansionPanel square onChange = {handleChange('panel1')}>
							<ExpansionPanelSummary aria-controls = "panel1d-content" id = "panel1d-header">
								<Typography variant = "h4">
									Preparing Orders
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
									sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
									elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						
						
						<ExpansionPanel square onChange = {handleChange('panel2')}>
							<ExpansionPanelSummary aria-controls = "panel2d-content" id = "panel2d-header">
								<Typography variant = "h4">
									Pending Orders
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
									sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
									elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						
						
						<ExpansionPanel square onChange = {handleChange('panel3')}>
							<ExpansionPanelSummary aria-controls = "panel3d-content" id = "panel3d-header">
								<Typography variant = "h4">
									Completed Orders
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
									sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
									elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						
				</Container>
			</div>
		</div>
	);
}
