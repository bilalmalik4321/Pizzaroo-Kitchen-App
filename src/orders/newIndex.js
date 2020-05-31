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

import { updateOrder } from '../api';
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

const countOrder = (incomings,step) => {
  let count = 0;
  incomings.map((order,index) => {

    if( order.progressStep === step)
      count = count + 1;
  })

  return count;
}

const Orders = subscribe()((props) =>  {


  const classes = useStyles();

  const [completed, setCompleted] =useState(false);

  console.log("today",moment().format('MMMM-Do-YYYY'));
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const { loading } = props.orders;

  // new work

  // get all the orders from firestore
  const fetchData =  async ()=>{
    try {
      await firebase.firestore()
        .collection('orders')
        .where('status', '==', 'open')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
          if (change.type === 'modified') {
            console.log("changed----", change.doc.data());
            // props.updateOrders({ incomings: change.doc.data(), loading: false})
          }
        })
      })
  } catch (err) {
    console.log("error", err);
  }}

  useEffect(() => {
    props.getCustomerOrders();
    fetchData();
  }, [props.getCustomerOrders])



  const { incomings } = props.orders;


  console.log("incomings", props.orders);

  const onRejectOrder = async (pushId) => {
    await updateOrder(pushId,'cancelled', 'closed');
  }

  const onAcceptOrder = async (pushId) => {
    console.log("accept the order")
    await updateOrder(pushId,'confirmed', 'open');
  }

  // const onPrepareOrder = async (pushId) => {
  //   await updateOrder(pushId, 'preparing', 'open');
  // }

  const onCompleteOrder = async (pushId) => {
    await updateOrder(pushId, 'enroute', 'open');
  }

  const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
  ];
  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }
  function priceRow(qty, unit) {
    return qty * unit;
  }



  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        alignItems="center" justify="space-between"
      >
        <Typography  variant="h4" gutterBottom>
          Date: {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
        <Button
          style={{marginBottom: 20}}
          variant="contained"
          color="secondary"
          onClick={(e) => handleClick(e)}
        >
        <Typography variant="h6">View Completed Orders</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

          <Card variant="outlined">
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-evenly" >
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                      Completed/Enroute Orders:
                  </Typography>
                  <Typography  variant="h3" gutterBottom>
                    {!loading ? countOrder(incomings, 'enroute') : ''}
                  </Typography>
                </Grid>


                {!loading && incomings && incomings.length !== 0 && incomings.sort((a,b)=> a.createdAt < b.createdAt).map((order,index) => {

                if(order.progressStep === 'enroute'){
                  return(

                  <div className={classes.orderBox} key={index}>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <CustomerInfo order={order}/>
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


{/*
                            <TableRow>
                              <TableCell colSpan={3}>
                                <Grid
                                  container
                                  direction="row"
                                  justify="space-around"
                                  alignItems="center"
                                >
                                  <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                      onCompleteOrder(order.id)
                                    }}
                                  >
                                      <Typography variant="h6">Complete</Typography>
                                  </Button>


                                </Grid>
                              </TableCell>
                            </TableRow> */}
                        </TableBody>
                      </Table>
                    </TableContainer>

                </div>
                )}})}
                </CardContent>
              </Card>









      </Popover>

      </Grid>


      <Grid container spacing={1}>
        <Grid item xs>
          <Card variant="outlined">
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-evenly">
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                      Incoming Orders:
                  </Typography>
                  <Typography  variant="h3" gutterBottom>
                    {!loading ? countOrder(incomings, 'waiting') : ''}
                  </Typography>
                </Grid>
{/*
                <Divider style={{ marginTop: 20, marginBottom: 20 }} /> */}
                {!loading && incomings && incomings.length !== 0 && incomings.sort((a,b)=> a.createdAt < b.createdAt).map((order,index) => {

                  if(order.progressStep === 'waiting'){
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
                                    <Button
                                      className={classes.button}
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => {
                                        onRejectOrder(order.id)
                                      }}
                                    >
                                        <Typography variant="h6">Contact Customer to Reject</Typography>
                                    </Button>

                                      <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                          onAcceptOrder(order.id)
                                        }}
                                      >
                                      <Typography variant="h6">Accept</Typography>
                                    </Button>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>

                  </div>
                )}})}
            </CardContent>
          </Card>
        </Grid>




            <Grid item xs>
             <Card variant="outlined">
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-evenly" >
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                      Preparing Orders:
                  </Typography>
                  <Typography  variant="h3" gutterBottom>
                    {!loading ? countOrder(incomings, 'confirmed') : ''}
                  </Typography>
                </Grid>


                {!loading && incomings && incomings.length !== 0 && incomings.sort((a,b)=> a.createdAt < b.createdAt).map((order,index) => {

                if(order.progressStep === 'confirmed'){
                  return(

                  <div className={classes.orderBox} key={index}>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <CustomerInfo order={order}/>
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
                            return order.items[typeOfFood].map((anItem, ii ) => {
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
                                  <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                      onCompleteOrder(order.id)
                                    }}
                                  >
                                      <Typography variant="h6">Complete</Typography>
                                  </Button>


                                </Grid>
                              </TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                </div>
                )}})}
                </CardContent>
              </Card>
            </Grid>



      </Grid>
      </Container>
    </div>

  );
});


export default Orders;



const CustomerInfo = ({order}) => {
  const [open, setOpen] = useState(false);


  return (
    <div style={{ paddingBottom: 20 }}>
    <Typography color="textSecondary" variant="h6">
        Order #{order.id}
      </Typography>

      <Typography color="textSecondary" variant="h6">
        Ordered At: {convertDate(order.createdAt)}
      </Typography>
      <Button
        style={{ magrin: 0, padding: 0}}
        color="primary"
        onClick={() => setOpen(!open)}
      >
      <Typography variant="h6">{!open ?"Show Info":"Hide info"}</Typography>
      </Button>
      { open &&
        <div>
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
      }


    </div>
  )
}
