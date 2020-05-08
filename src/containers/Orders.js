import React from 'react';
import { Link, Redirect } from "react-router-dom";
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
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Profile from './profile';

function logout() {
    fire.auth().signOut();
  }

function direct() {
    history.push("Login");
  }
  
function createData(orderId, totalQuantity, timeOfOrder, carbs) {
  return {
    orderId,
    totalQuantity,
    timeOfOrder,
    carbs,
    history: [
      { itemId: '1', itemName: 'Cheese pizza (XL)', amount: 3, instruction:"Well done",price:12.20 },
      { itemId: '2', itemName: 'Pepperoni pizza (L)', amount: 1, instruction:"Easy on the cheese please", price:14.50 },
    ],
    };
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      <TableRow >
	  
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
		
        <TableCell align="left">
          <Typography variant="h6" >
            {row.orderId}
          </Typography>
        </TableCell>
		
        <TableCell align="right">
          <Typography variant="h6" >
            {row.totalQuantity}
          </Typography>
        </TableCell>
		
        <TableCell align="right">
          <Typography variant="h6" >
            {row.timeOfOrder}
          </Typography>
        </TableCell>
		
        <TableCell align="right">
          <Button variant="contained" color="primary">
            <Typography variant="h6" >
              Being prepared
            </Typography>
          </Button>
        </TableCell>
		
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Order details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
				  
                    <TableCell>
                      <Typography variant = "h5">
                        ID
                      </Typography>
                    </TableCell>
					
                    <TableCell>
                      <Typography variant = "h5">
                        Item
                      </Typography>
                    </TableCell>
					
                    <TableCell>
                      <Typography variant = "h5">
                        Quantity
                      </Typography>
                    </TableCell>
					
                    <TableCell align="right">
                      <Typography variant = "h5">
                        Special instructions
                      </Typography>
                    </TableCell>
					
                    <TableCell align="right">
                      <Typography variant = "h5">
                        Total price ($)
                      </Typography>
                    </TableCell>
					
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.itemId}>
					
                      <TableCell component="th" scope="row">
                        <Typography variant = "h5">
                        {historyRow.itemId}
                        </Typography>
                      </TableCell>
					  
                      <TableCell>
                        <Typography variant = "h5">
                          {historyRow.itemName}
                        </Typography>
                      </TableCell>
					  
                      <TableCell>
                        <Typography variant = "h5">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>
					  
                      <TableCell align="right">
                        <Typography variant = "h5">
                        {historyRow.instruction}
                        </Typography>
                      </TableCell>
					  
                      <TableCell align="right">
                        <Typography variant = "h5">
                          {(historyRow.amount * historyRow.price).toFixed(2) }
                        </Typography>
                      </TableCell>
					  
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
	
  row: PropTypes.shape({
    totalQuantity: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    timeOfOrder: PropTypes.number.isRequired,
	
    history: PropTypes.arrayOf(
	
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        itemName: PropTypes.string.isRequired,
        itemId: PropTypes.string.isRequired,
      }),
	  
    ).isRequired,
	
    itemId: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
  
};

var count=1;

const rows = [

  createData(count, 2, '11am'),
  createData(++count, 2, '11.15am'),
  createData(++count, 2, '11.20am'),
  createData(++count, 2, '11.25am'),
  createData(++count, 2, '11.30am'),
  
];

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
                  
                    <Profile />

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
                    5
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
                  Orders moved from pending appear here
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
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table" style={{ width: 1200 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell />
                            <TableCell>
                              <Typography variant = "h5">
                                Order Number
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant = "h5">
                                No. of Items
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant = "h5">
                                Time of order
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <Row key={row.orderId} row={row} />
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
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
                  orders moved from preparing appear here
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

        </Container>
      </div>
    </div>
  );
}
