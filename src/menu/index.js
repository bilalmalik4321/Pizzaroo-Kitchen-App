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
import { subscribe } from 'react-contextual';
import moment from 'moment';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PizzaCard from './pizzaCard';
import { TextField} from '@material-ui/core';
import EditSave from './Edit_Save';
import 'date-fns';
import ItemCard from './itemCard';
import DateFnsUtils from '@date-io/date-fns';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TimeKeeper from 'react-timekeeper';

import { updateStoreHour } from '../api';
import firebase from '../firebase';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Menu = subscribe()(props=> {
  const fetchData =  async ()=>{
    const {email} = firebase.auth().currentUser;

    try {
      await firebase.firestore()
        .collection('stores')
        .where('email', '==', email)
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
          if (change.type === 'modified') {
            // console.log("changed----", change.doc.data());
            props.updateStore({ ...change.doc.data(), loading: false})
          }
        })
      })
    } catch (err) {
      console.log("error", err);
    }
  }

  useEffect(()=>{


    fetchData();

  },[fetchData]);
  const [loadingTime, setLoadingTime] = useState(false);
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
    },

    pizzaCard :{
      // backgroundColor: 'red',
      // borderWidth: 10,
      // borderColor: 'black',
      maxWidth: 300,
      minWidth: 300
    },

    photo : {
      backgroundColor: '#dddddd',
      height: 250
    },
    textField: {
      width: 200,
      height: 100,
      padding: 20
    },
    absolute: {
      // position: 'absolute',
      // bottom: theme.spacing(2),
      // right: theme.spacing(3),
      backgroundColor: 'red'
    },
    absoluteTwo: {
      // position: 'absolute',
      // bottom: theme.spacing(2),
      // right: theme.spacing(3),
      // backgroundColor: 'blue'
    },
    listText: {
      fontSize: 20
    }

  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);


  const onSaveStoreHour = async () => {

    setLoadingTime(true);

    const result = await updateStoreHour({
      open: openHour,
      close: closeHour
    });

    setLoadingTime(false);
    setToggleTime(false);
  }

  const openI = Boolean(anchorEl);
  const id = openI ? 'simple-popover' : undefined;


  const [addPizza, setAddPizza] = useState(false);
  const [addSide, setAddSide] = useState(false);
  const [addDessert, setAddDessert] = useState(false);
  const [addDrink, setAddDrink] = useState(false);
  const [addDipping, setAddDipping] = useState(false);



  const { menu , loading, hour } = props.restaurant;
  const { open, close} = hour;

  const { pizzas, sides, drinks, desserts, dippings } = menu;

  const [toggleTime, setToggleTime] = useState(false);

  const [openHour, setOpenHour] = useState(!open? '12:00am' : open);
  const [closeHour, setCloseHour ] = useState(!open? '12:00am' : close);

  console.log("props ----",open, 'close', close, '!open', !open);
  return (
    <div style={{ padding: 20}}>
    <Container maxWidth="lg">
      <Grid container spacing={1} direction="column" spacing={5}>
        <Grid item xs >
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <CheckCircleOutlineIcon style={{fontSize:30 ,color: !open && !close? '' : 'green'}}/>
              </ListItemIcon>
              <ListItemText
                primary={<Typography style={{fontSize: 20 }}>Store Hour</Typography>}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CheckCircleOutlineIcon style={{fontSize:30, color: !menu ? '':'green'}}/>
              </ListItemIcon>
              <ListItemText
                primary={<Typography style={{fontSize: 20 }}>Menu</Typography>}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs>
          <Grid container direction="row" justify="flex-start" spacing={3}>
            <Grid item>

              <TextField
                readOnly
                value={open || ''}
                inputProps={{ style: { fontSize: 20, width: 260}}}
                InputLabelProps={{ style: {fontSize: 20}}}
                id="outlined-basic"
                label="Open"
                variant="standard"

              />
              </Grid>
            <Grid item>
             <TextField
                readOnly
                value={close || ''}
                inputProps={{ style: { fontSize: 20, width: 260}}}
                InputLabelProps={{ style: {fontSize: 20}}}
                id="outlined-basic"
                label="Close"
                variant="standard"

              />

            </Grid>
            { toggleTime &&
              <Grid item>
              <Tooltip title="Add" aria-label="add" onClick={()=> onSaveStoreHour()}>
                <Fab color="primary" className={classes.absoluteTwo}>
                  <SaveIcon style={{ fontSize: 30}}/>
                </Fab>
              </Tooltip>
            </Grid>
            }
            { !toggleTime &&
              <Grid item>
                <Tooltip title="Add" aria-label="add" onClick={() => setToggleTime(true)}>
                  <Fab color="secondary" className={classes.absolute}>
                    <BorderColorIcon style={{ fontSize: 30}}/>
                  </Fab>
                </Tooltip>
              </Grid>
            }


          </Grid>
        </Grid>

        {toggleTime &&
        <Grid item xs container direction="row" spacing={3}>
          <Grid item >
              <TimeKeeper
                  defaultValue="10:00am"
                  time={openHour}
                  onChange={(data) => setOpenHour(data.formatted12)}
                />
              </Grid>
              <Grid  item >

                <TimeKeeper
                   defaultValue="11:00pm"
                  time={closeHour}
                  onChange={(data) => setCloseHour(data.formatted12)}
                />
              </Grid>
        </Grid>

        }

        <Grid item xs >
          <Card>

            <Grid  container direction="row" justify="space-between">
              <Typography color="textSecondary" variant="h3" gutterBottom>
                Pizzas
              </Typography>
            </Grid>


          <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>

          {menu && pizzas.length !== 0 && pizzas.map((item, index)=> (

            <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} >
              <ItemCard typeOfFood="pizzas" item={item}/>
            </Grid>

          ))}


                        {/* add new pizza  */}



              <Grid item xs={3} sm={2} className={classes.pizzaCard} >

                { !addPizza &&

                <Card style={{ height: 380, width: 250}}>
                  <CardContent>
                    <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{ height: 350}}>
                      <Icon onClick={()=> setAddPizza(!addPizza)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                    </Grid>
                  </CardContent>
                </Card>
                }
                { addPizza &&
                  <EditSave toggle={addPizza} action={'add'} typeOfFood="pizzas" setToggle={setAddPizza} />
                }
              </Grid>

                      {/*  end of add new pizza  */}


            </Grid>
          </Card>
        </Grid>






        <Grid item xs>
          <Card>

            <Typography color="textSecondary" variant="h3" gutterBottom>
                Sides
            </Typography>


            <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>

              { menu && sides.length !== 0 && sides.map((item, index)=> (

                <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} >
                  <ItemCard item={item} typeOfFood="sides" />
                </Grid>

              ))}

                          {/* add new pizza  */}

                <Grid item xs={3} sm={2} className={classes.pizzaCard} >

                  { !addSide &&

                  <Card style={{ height: 200, width: 250}}>
                    <CardContent>
                      <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{  height: 180}}>
                        <Icon onClick={()=> setAddSide(!addSide)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                      </Grid>
                    </CardContent>
                  </Card>
                  }
                  { addSide &&
                    <EditSave toggle={addSide} action={'add'} typeOfFood="sides" setToggle={setAddSide} />
                  }
                </Grid>

                        {/*  end of add new pizza  */}
            </Grid>


          </Card>
        </Grid>


        <Grid item xs>
          <Card>

              <Typography color="textSecondary" variant="h3" gutterBottom>
               Desserts
              </Typography>


              <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>

              {menu && desserts.length !== 0 && desserts.map((item, index)=> (

                <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} >
                  <ItemCard item={item} typeOfFood="desserts" />
                </Grid>

              ))}

                          {/* add new pizza  */}

                <Grid item xs={3} sm={2} className={classes.pizzaCard} >

                  { !addDessert &&

                  <Card style={{ height: 200, width: 250}}>
                    <CardContent>
                      <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{ height: 180}}>
                        <Icon onClick={()=> setAddDessert(!addDessert)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                      </Grid>
                    </CardContent>
                  </Card>
                  }

                  { addDessert &&
                    <EditSave toggle={addDessert} action={'add'} typeOfFood="desserts" setToggle={setAddDessert} />
                  }
                </Grid>

                        {/*  end of add new pizza  */}
            </Grid>


          </Card>
        </Grid>


        <Grid item xs>
          <Card>

            <Typography color="textSecondary" variant="h3" gutterBottom>
                Dippings
            </Typography>

            <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>

              {menu && dippings.length !== 0 && dippings.map((item, index)=> (

                <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} >
                  <ItemCard item={item} typeOfFood="dippings" />
                </Grid>

              ))}

                          {/* add new pizza  */}

                <Grid item xs={3} sm={2} className={classes.pizzaCard} >

                  { !addDipping &&

                  <Card style={{ height: 200, width: 250}}>
                    <CardContent>
                      <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{ height: 180}}>
                        <Icon onClick={()=> setAddDipping(!addDipping)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                      </Grid>
                    </CardContent>
                  </Card>
                  }

                  { addDipping &&
                    <EditSave toggle={setAddDipping} action={'add'} typeOfFood="dippings" setToggle={setAddDipping} />
                  }
                </Grid>

                        {/*  end of add new pizza  */}
            </Grid>



          </Card>
        </Grid>

        <Grid item xs>
          <Card>

            <Typography color="textSecondary" variant="h3" gutterBottom>
               Drinks
            </Typography>

            <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>

              {menu && drinks.length !== 0 && drinks.map((item, index)=> (

                <Grid item xs={3} sm={2} className={classes.pizzaCard} key={index} >
                  <ItemCard item={item} typeOfFood="drinks" />
                </Grid>

              ))}

                          {/* add new pizza  */}

                <Grid item xs={3} sm={2} className={classes.pizzaCard} >

                  { !addDrink &&

                  <Card style={{ height: 200, width: 250}}>
                    <CardContent>
                      <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{ height: 180}}>
                        <Icon onClick={()=> setAddDrink(!addDrink)} fontSize="large" color="primary" style={{ alignSelf: 'center'}}>add_circle</Icon>
                      </Grid>
                    </CardContent>
                  </Card>
                  }

                  { addDrink &&
                    <EditSave toggle={setAddDrink} action={'add'} typeOfFood="drinks" setToggle={setAddDrink} />
                  }
                </Grid>

                {/*  end of add new pizza  */}
            </Grid>


          </Card>
        </Grid>


      </Grid>
      </Container>
    </div>
  )
})


export default Menu;
