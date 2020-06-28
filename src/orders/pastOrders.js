import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Badge from '@material-ui/core/Badge';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import OrdersNav from "../app/layout/ordersNav";
import { navigate } from 'hookrouter';
import Popover from '@material-ui/core/Popover';
import { subscribe } from 'react-contextual';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { updateOrder, getAllOrders } from '../api';
import firebase from '../firebase';

const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLL');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  outer: {
    borderColor: 'grey',
    borderWidth: 2
  },
  table: {
    minWidth: 300,
  },
  itemName: {

    width: 50
  },
  itemSizeCell: {
    width: 50
  },
  orderBox: {
    paddingBottom: 30
  },
  button: {
    marginTop: 0
  },
  buttonInfo: {
    padding: 0,
    margin: 0
  }

}));

// const countOrder = (incomings,step) => {
//   let count = 0;
//   incomings.map((order,index) => {

//     if( order.progressStep === step)
//       count = count + 1;
//   })

//   return count;
// }

const Orders = subscribe()((props) =>  {


  const classes = useStyles();

  const [loading, setLoading ] = useState(false);
  const [days, setDays] = useState(undefined);
  const [empty, setEmpty] = useState(false);

  // new work

  // get all the orders from firestore
  const fetchData =  async (days)=>{
    try {

      await getAllOrders(days, setIncomings);
      // setIncomings(incomings)
      props.updateOrders({ incomings })
      console.log("hello incomings", incomings);
  } catch (err) {
    console.log("error", err);
  }}

  const onSearch = (days) => {
    setEmpty(false)
    setLoading(true);
    fetchData(days)
    setLoading(false)
  }

  const [incomings, setIncomings] = useState([]);

  // console.log("incomings", incomings);

  return (
    <div className={classes.root}>
      <Grid 
        container
        direction="row" 
        alignItems="center" justify="space-between"
      >
        <Typography  variant="h4" gutterBottom>
          Date: {moment().format('MMMM Do YYYY, h:mm a')}
        </Typography>
        
     
      </Grid>

      
      <Grid container spacing={1}>
        <Grid item xs>
          <Card variant="outlined">
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-evenly">
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                      Past Orders:  
                  </Typography>
                 
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Days</InputLabel>
                    <Select
                      defaultValue=""
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={days || ""}
                      onChange={(e) =>{
                        console.log('eee',e.target.value);
                        setDays(e.target.value);
                        onSearch(e.target.value);
                      }}
                      label="Days"
                    >
                      <MenuItem value={-1}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Today</MenuItem>
                      <MenuItem value={1}>Yesterday</MenuItem>
                      <MenuItem value={2}>Last 2 days</MenuItem>
                      <MenuItem value={3}>Last 3 days</MenuItem>
                      <MenuItem value={4}>Last 4 days</MenuItem>
                      <MenuItem value={5}>Last 5 days</MenuItem>
                      <MenuItem value={6}>Last 6 days</MenuItem>
                      <MenuItem value={7}>Last 7 days</MenuItem>
                      <MenuItem value={8}>Last 8 days</MenuItem>
                      <MenuItem value={9}>Last 9 days</MenuItem>
                      <MenuItem value={10}>Last 10 days</MenuItem>
                      <MenuItem value={15}>Last 15 days</MenuItem>
                      <MenuItem value={30}>Last 30 days</MenuItem>
                  
                    </Select>
                  </FormControl>
        
                </Grid>

                
                {!loading && incomings && incomings.length !== 0 && incomings.map((order,index) => {

                    return(
                    
                    <div className={classes.orderBox} key={index}>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                      <div style={{ paddingBottom: 20 }}>
                      <Typography color="textSecondary" variant="h6">
                          Order #{order.id}
                        </Typography>
                        <Typography color="textSecondary" variant="h6">
                          Ordered At: {convertDate(order.createdAt)}
                        </Typography>
                        <Typography color="textSecondary">
                          Customer: {order.customerName}
                        </Typography>
                        <Typography color="textSecondary">
                          Email: {order.customerEmail}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Phone: {order.customerPhone}
                        </Typography>
                        <Typography color="textSecondary">
                          Payment: {order.payment}
                        </Typography>
                        <Typography color="textSecondary">
                          Status: {order.status}
                        </Typography>
                        <Typography color="textSecondary">
                          Number of Item: {order.numberOfItems}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Total: {order.total.toFixed(2)}
                        </Typography>
                        <Typography color="textSecondary">
                          Delivery Instruction: {order.instruction? order.instruction : "N/A"}
                        </Typography>
                        <Typography color="textSecondary" variant="h6">
                          Address: { `${order.address.apt? " " : "Apt/Unit: " + order.address.apt}`  + " " + order.address.street +" "+ order.address.city+ " " + order.address.postalCode }
                        </Typography>
                    
              
                      </div>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.itemName}>Item</TableCell>
                              <TableCell align="right" className={classes.itemSizeCell}>Size</TableCell>
                              <TableCell align="right" className={classes.itemSizeCell}>Sum</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          { order.items && Object.keys(order.items).map((typeOfFood, i)=>{
                              return order.items[typeOfFood].sort((a,b)=> a.price < b.price).map((anItem, ii ) => {
                                return (
                                    <TableRow key={ii }>
                                      <TableCell >
                                        <h5>
                                        {anItem.quantity} x {anItem.name}
                                        </h5>
                                        <h5 style={{ fontWeight: 'normal', color: 'grey'}}>
                                          {anItem.instruction}
                                        </h5>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h5>
                                        {anItem.size}
                                        </h5>
                                       </TableCell>
                                      <TableCell align="right">
                                        <h5>
                                        {anItem.price}
                                        </h5>
                                     </TableCell>
                                    </TableRow>
                                      )
                                })})}
                                <TableRow>
                                <TableCell colSpan={2} >
                                  <h5>
                                  Subtotal
                                  </h5>
                                </TableCell>  
                                <TableCell align="right">
                                  <h4>
                                  {order.total.toFixed(2)}
                                  </h4>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3}>
                                  <Grid 
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="center"
                                  >
                                     
                                  </Grid> 
                                </TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                
                  </div>
                )})}
            </CardContent>
          </Card>
        </Grid>

      
      
      </Grid>
      { 
      !loading && days !== undefined && days >= 0 && incomings.length === 0 &&
        <Grid container justify="center">
          { days === 0 ? <h1> There is no orders, today !</h1> :
            <h1> There is no orders, { days === 1 ? 'yesterday !': 'last '+ days + ' days!'}</h1>
          }
        </Grid>
      }
    </div>

  );
});


export default Orders;


