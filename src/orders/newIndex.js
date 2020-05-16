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




const Orders = subscribe()((props) =>  {

  const [open, setOpen] =useState(false);

  console.log("today",moment().format('MMMM-Do-YYYY'));
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();

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
    await updateOrder(pushId,'confirmed', 'closed');
  }

  const onAcceptOrder = async (pushId) => {
    console.log("accept the order")
    await updateOrder(pushId,'confirmed', 'open');
  }

  const onPrepareOrder = async (pushId) => {
    await updateOrder(pushId, 'preparing', 'open');
  }

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
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Card variant="outlined">
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-evenly">
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                      Incoming Orders:  
                  </Typography>
                  <Typography  variant="h3" gutterBottom>
                      14 
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
                                        onPrepareOrder(order.id)
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


        {/* ---------- Pending Orders ------------ */}
        <Grid item xs>
          <Card variant="outlined">
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-evenly" >
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                      Pending Orders:  
                  </Typography>
                  <Typography  variant="h3" gutterBottom>
                      14 
                  </Typography>
                </Grid>
          

                {!loading && incomings && incomings.length !== 0 && incomings.sort((a,b)=> a.createdAt < b.createdAt).map((order,index) => {

                if(order.progressStep === 'confirmed'){
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
                      <Button
                        className={classes.buttonInfo}
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

                              {
                                open && 
                             
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
                            
                              }
                             
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
                                      <Typography variant="h6">Start preparing</Typography>
                                  </Button>

                                    <Button
                                      className={classes.button}
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        onCompleteOrder(order.id)
                                      }}
                                    >
                                    <Typography variant="h6">Completed</Typography>
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
                      14 
                  </Typography>
                </Grid>


                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                        Details
                      </TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Desc</TableCell>
                      <TableCell align="right">Qty.</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">Sum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.desc}>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell align="right">2</TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">12</TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>Subtotal</TableCell>
                      <TableCell align="right">22222</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align="right">122</TableCell>
                      <TableCell align="right">21</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">9000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
               
              </CardContent>
              
          </Card>
        </Grid>
      </Grid>
    </div>

  );
});


export default Orders;








// function createData(orderId, totalQuantity, timeOfOrder, carbs) {
//   return {
//     orderId,
//     totalQuantity,
//     timeOfOrder,
//     history: [
//       {
//         itemId: "1",
//         itemName: "Cheese pizza (XL)",
//         amount: 3,
//         instruction: "Well done This is lomg instruction,then what will happen to the div",
//         price: 12.2,
//       },
//       {
//         itemId: "2",
//         itemName: "Pepperoni pizza (L)",
//         amount: 1,
//         instruction: "Easy on the cheese please",
//         price: 14.5,
//       },
//     ],
//   };
// }



// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>

//         <TableCell align="left">
//           <Typography variant="h6">{row.orderId}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Typography variant="h6">{row.totalQuantity}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Typography variant="h6">{row.timeOfOrder}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => {
//               rowsPrep.push(row);
//               rows.splice(rows.indexOf(row), 1);
//             }}
//           >
//             <Typography variant="h6">Being prepared</Typography>
//           </Button>
//         </TableCell>
//       </TableRow>

//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h5" gutterBottom component="div">
//                 Order details
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <Typography variant="h5">ID</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography variant="h5">Item</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography variant="h5">Quantity</Typography>
//                     </TableCell>

//                     <TableCell align="right">
//                       <Typography variant="h5">Special instructions</Typography>
//                     </TableCell>

//                     <TableCell align="right">
//                       <Typography variant="h5">Total price ($)</Typography>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow, index) => (
//                     <TableRow key={historyRow.itemId}>
//                       <TableCell component="th" scope="row">
//                         <Typography variant="h5">
//                           {historyRow.itemId}
//                         </Typography>
//                       </TableCell>

//                       <TableCell>
//                         <Typography variant="h5">
//                           {historyRow.itemName}
//                         </Typography>
//                       </TableCell>

//                       <TableCell>
//                         <Typography variant="h5">
//                           {historyRow.amount}
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Typography variant="h5">
//                           {historyRow.instruction}
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Typography variant="h5">
//                           {(historyRow.amount * historyRow.price).toFixed(2)}
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// function RowTwo(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             // onClick={() => setOpen(!open)}
//           >
//             {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
//           </IconButton>
//         </TableCell>

//         <TableCell align="left">
//           <Typography variant="h6">{row.orderId}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Typography variant="h6">{row.totalQuantity}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Typography variant="h6">{row.timeOfOrder}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => {
//               // rows.push(row);
//               // rowsPrep.splice(rowsPrep.indexOf(row), 1);
//             }}
//           >
//             <Typography variant="h6">Still pending</Typography>
//           </Button>
//           <Button
//             variant="contained"
//             color="default"
//             onClick={() => {
//               // rowsCompleted.push(row);
//               // rowsPrep.splice(rowsPrep.indexOf(row), 1);
//             }}
//           >
//             <Typography variant="h6">Completed</Typography>
//           </Button>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h5" gutterBottom component="div">
//                 Order details
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <Typography variant="h5">ID</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography variant="h5">Item</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography variant="h5">Quantity</Typography>
//                     </TableCell>

//                     <TableCell align="right">
//                       <Typography variant="h5">Special instructions</Typography>
//                     </TableCell>

//                     <TableCell align="right">
//                       <Typography variant="h5">Total price ($)</Typography>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>


//                 <TableBody>

//                     <TableRow >
//                       <TableCell component="th" scope="row">
//                         <Typography variant="h5">
//                          item ID
//                         </Typography>
//                       </TableCell>

//                       <TableCell>
//                         <Typography variant="h5">
//                         item Name
//                         </Typography>
//                       </TableCell>

//                       <TableCell>
//                         <Typography variant="h5">
//                          item amount
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Typography variant="h5">
//                          item instruction
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Typography variant="h5">
//                          item price
//                         </Typography>
//                       </TableCell>
//                     </TableRow>

//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }
// function RowThree(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>

//         <TableCell align="left">
//           <Typography variant="h6">{row.orderId}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Typography variant="h6">{row.totalQuantity}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Typography variant="h6">{row.timeOfOrder}</Typography>
//         </TableCell>

//         <TableCell align="right">
//           <Button variant="contained" disabled>
//             <Typography variant="h6">Out the door</Typography>
//           </Button>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h5" gutterBottom component="div">
//                 Order details
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <Typography variant="h5">ID</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography variant="h5">Item</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography variant="h5">Quantity</Typography>
//                     </TableCell>

//                     <TableCell align="right">
//                       <Typography variant="h5">Special instructions</Typography>
//                     </TableCell>

//                     <TableCell align="right">
//                       <Typography variant="h5">Total price ($)</Typography>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.itemId}>
//                       <TableCell component="th" scope="row">
//                         <Typography variant="h5">
//                           {historyRow.itemId}
//                         </Typography>
//                       </TableCell>

//                       <TableCell>
//                         <Typography variant="h5">
//                           {historyRow.itemName}
//                         </Typography>
//                       </TableCell>

//                       <TableCell>
//                         <Typography variant="h5">
//                           {historyRow.amount}
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Typography variant="h5">
//                           {historyRow.instruction}
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Typography variant="h5">
//                           {(historyRow.amount * historyRow.price).toFixed(2)}
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }
