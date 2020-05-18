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

import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



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

const TransitionsModal = ({ edit, setAnchorEl, setEdit, anchorEl, open, setOpen}) => {

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

  const classes = useStyles();

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title">Are you sure to remove this item?</h5>
            <Grid
              style={{ marginTop: 30}}
              justify="space-between"
              container
             >
                <Button
                  variant="outlined"
                  color="secondary"
                >
                  Yes
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={()=>handleClose()}
                >
                  No
                </Button>
            </Grid>
     
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


const Menu = subscribe()(props=> {

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
    }
  
  }));
  const classes = useStyles();
  const pizzas = [
    {
      uuid: 123,
      name: 'Hawaii',
      description: 'Best pizza',
      photo: '',
      sizes: [
        {
          size: 'S',
          description: 'Small',
          price: 10.99
        },
        {
          size: 'M',
          description: 'Medium',
          price: 10.99
        },
        {
          size: 'L',
          description: 'Large',
          price: 10.99
        },
        {
          size: 'XL',
          description: 'Extra large',
          price: 10.99
        }
      ]
    },
    {
      uuid: 123,
      name: 'Hawaii',
      description: 'Best pizza',
      sizes: [
        {
          size: 'S',
          description: 'Small',
          price: 10.99
        },
        {
          size: 'M',
          description: 'Medium',
          price: 10.99
        },
        {
          size: 'L',
          description: 'Large',
          price: 10.99
        },
        {
          size: 'XL',
          description: 'Extra large',
          price: 10.99
        }
      ]
    }
  ]



  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openI = Boolean(anchorEl);
  const id = openI ? 'simple-popover' : undefined;

  const [edit, setEdit] = useState(true)
  const [open, setOpen] = React.useState(false);



  return (
    <div style={{ padding: 20}}>
      <Grid container spacing={1} direction="column" alignItems="right" >
        <Grid item xs >
          <Card>

      
            <Typography color="textSecondary" variant="h3" gutterBottom>
              Pizzas 
            </Typography>
          

          <Grid container direction="row" spacing={3} style={{ padding: 20, backgroundColor: '#f7f7f7'}}>
            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            { !edit && 
            <Card  >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3">
                    Lizard
                  </Typography>
                  <p style={{fontSize: 12, color: 'grey' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </p>

                  {/* --------- price coloum grid ---------- */}
                  <Grid container direction="column">

                    <Grid item xs>
                      <Grid  container direction="row" justify="space-between">
                        <Grid item >
                          <p>
                            Small
                          </p>
                        </Grid>
                        <Grid item >
                          <p>
                            $10.99
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs>
                      <Grid  container direction="row" justify="space-between">
                        <Grid item >
                          <p>
                            Medium
                          </p>
                        </Grid>
                        <Grid item >
                          <p>
                            $10.99
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>


                    <Grid item xs>
                      <Grid  container direction="row" justify="space-between">
                        <Grid item >
                          <p>
                            Large
                          </p>
                        </Grid>
                        <Grid item >
                          <p>
                            $10.99
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                 
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Grid container direction="row" justify="space-between">
                  <Button size="small" color="primary" onClick={() => setEdit(!edit)}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() =>setOpen(!open) }>
                    Remove
                  </Button>

                </Grid>
               <TransitionsModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} edit={edit} setEdit={setEdit} open={open} setOpen={setOpen}/>
              </CardActions>
            </Card> }

            {
              edit && 
              <Card  >
              <CardActionArea>
              <CardMedia
                  className={classes.photo}
                  image={''}
                  title="Contemplative Reptile"
 
                >

                <Grid container justify="center" alignItems="center" style={{ height: '100%'}}>
                  <Button
                      variant="contained" 
                      color="primary" 
                      style={{ alignSelf: 'center', alignItems: 'center' }}
                      component="label"
                    >
                      Upload Photo
                      <input
                        type="file"
                        style={{ display: "none" }}
                      />
                    </Button>
                </Grid>
              </CardMedia>
                
  
                {/* <Divider></Divider> */}
                <CardContent>
                  
                    <Input
                      style={{ fontSize: 25}}
                      // value={anchorEl}
                      // onChange={ e => {setAnchorEl(e.target.value)}}
                      placeholder="Name"
                    >
                    </Input>

                    
                    <Input
                      
                      multiline={true}
                      style={{ fontSize: 12, width: '100%', color: 'grey' , marginTop: 20}}
                      value={anchorEl}
                      onChange={ e => {setAnchorEl(e.target.value)}}
                      placeholder={`Description`}
                    >
                    </Input>
    

                  {/* --------- price coloum grid ---------- */}
                  <Grid container direction="column" style={{ marginTop: 20}}>

                    <Grid item xs>
                      <Grid  container direction="row" justify="space-between">
                        <Grid item style={{ }}>
                          <p>
                            Small
                          </p>
                        </Grid>
                        <Grid item >
                          <p>
                            $10.99
                          </p>
                        </Grid>
                        <Grid item >
                          <Button
                            variant="outlined"
                            color="secondary"
                          >
                           Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>

                    

                    <Grid item xs>
                    <Grid  container direction="row" justify="space-between" style={{ marginTop: 10}}>
                        <Grid item style={{ }}>
                         <Input
                             margin='dense'
                          style={{ width: 50, fontSize: 15}}
                          placeholder="Size"
                         >

                         </Input>
                        </Grid>
                        <Grid item >
                        <Input
                        margin='dense'
                          type="numeric"
                          style={{ width: 50, fontSize: 15}}
                          placeholder="Price"
                         >
                         </Input>
                        </Grid>
                        <Grid item >
                          <Button
                            variant="outlined"
                            color="primary"
                          >
                           add
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>



                  </Grid>
                 
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Grid container direction="row" justify="space-between">
                  <Button size="small" color="primary" onClick={() => setEdit(!edit)}>
                    Save
                  </Button>
                  <Button size="small" color="secondary" onClick={() => setEdit(!edit)}>
                    Cancel
                  </Button>
                </Grid>
               
              </CardActions>
            </Card>
            }
            </Grid>




            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                 Edit
                </Button>
                <Button size="small" color="primary">
                 Remove
                </Button>
              </CardActions>
            </Card>
            </Grid>
          
            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>

            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>

           <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>
            
            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
             <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>


            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>

            <Grid item xs={3} sm={2} className={classes.pizzaCard} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.photo}
                  image={require('./restaurant.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>
            
          
          
          </Grid>
         
          </Card>
        </Grid>
       
        <Grid item xs>
          <Card>
            <CardContent>
            <Typography color="textSecondary" variant="h3" gutterBottom>
                Sides
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs>
          <Card>
            <CardContent>
              <Typography color="textSecondary" variant="h3" gutterBottom>
               Desserts 
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs>
          <Card>
            <CardContent>
            <Typography color="textSecondary" variant="h3" gutterBottom>
                Dippings
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs>
          <Card>
            <CardContent>
            <Typography color="textSecondary" variant="h3" gutterBottom>
               Drinks
              </Typography>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </div>
  )
})


export default Menu;
