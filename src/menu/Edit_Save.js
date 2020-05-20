import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { subscribe } from 'react-contextual';

import Icon from '@material-ui/core/Icon';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import { TextField } from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { getStore } from '../api';
import { uuidv4 } from '../_shared/tools';
import firebase from '../firebase';

const notEmpty = (e) => JSON.stringify(e) !== JSON.stringify({});

const PizzaCard = subscribe()( props=> {

  // pizza, side, drink, desserts
  const { typeOfFood } = props;
  // add a new one or edit
  const { action } = props;
  const { uuid } = props;
  const { toggle, setToggle } = props;
  const { foodItem } = props;

  // pizza
  const [sizes, setSizes] = useState( action === 'edit'? foodItem.sizes : []);
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');

  // pizza, dessert, dipping, drink, side
  const [name, setName] = useState(action === 'edit'? foodItem.name : '');
  const [description, setDescription] = useState(action === 'edit'? foodItem.description : '');

  // dessert, dipping, drink, side
  const [singlePrice, setSinglePrice] = useState( action ==="edit"? foodItem.price : '');

  // drink type: bottle/can size: 500ml, 1L
  const [drinkType, setDrinkType] = useState(action === 'edit' ? foodItem.type : ''); 
  const [drinkSize, setDrinkSize] = useState(action === 'edit'? foodItem.size : '');
 




  const [errors , setErrors] = useState({});


  const { updateStore } = props;
  const [loading, setLoading] = useState(false);
  // console.log('sizes', sizes);
 
  const onAddSize = () => {

    let errs = validatePrice();

    // setLoading(true);
    // console.log("run errors", errs , '!errs', !errs, 'errs ===null', errs === null);
    // console.log("size", size, "price", price);
    if( JSON.stringify(errs) === JSON.stringify({})) {

      console.log("run------")
      let newSizes = sizes;
      newSizes.push({
        size,
        price
      });
      
      setSizes(newSizes);
      console.log("sizessss", sizes);
      setSize('');
      setPrice('');

    } else {
      setErrors(errs);
    }
   

    setLoading(false);
  }
  const onRemoveSize = (size) => {
    let newSizes = sizes.filter(e => e.size !== size);
    setSizes(newSizes);
  }
  const validateItem = () => {
    const isNumberTwo = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/);
    let error = {};

    if(!name) error.name = "Enter the item name.";

    if( typeOfFood !== 'drinks' && typeOfFood !== 'dippings'){
      if(!description) error.description = "Enter the item description.";
    }
      
    if( typeOfFood === 'pizzas') {

      if(sizes.length === 0) error.sizes = "Enter the size and price of item.";
    
    } else if ( typeOfFood === 'drinks') {

      if(!drinkSize) error.drinkSize = "Enter the drink size. e.g 500ml.";
      if(!drinkType) error.drinkType = "Enter the drink type. e.g bottle or can.";
    }

    if( typeOfFood !== 'pizzas') {
      if(!singlePrice) error.singlePrice = "Enter the item price.";
      if(!isNumberTwo.test(singlePrice.trim())) error.singlePrice = "Enter a valid price. e.g 10.99 or 10";
    }
    console.log("validation error =====", error);
    return error;

  }
  const validatePrice = () => {
    let error = {};

    const isNumber = new RegExp(/([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/);
    const isNumberTwo = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/);

    if(!size) error.size = "Enter a size.";
    if(!price) error.price = "Enter a valid price.";
    if(!isNumberTwo.test(price.trim())) error.price = "Enter a valid price e.g: 10.99 or 10";

    return error;
  }
  const onSave = async () => {
    setLoading(true);
    // props.updateStore({loading: true});
    if( action === 'add') {
    
      try {
        console.log("hello from saving, ", typeOfFood);
        const userId = props.restaurant.id;
        // const { menu } = await getStore(userId);
        const { menu } =props.restaurant;
        const newMenu = menu;

        let newList = newMenu[typeOfFood];

        let newItem = {
          uuid:  uuidv4(),
          name,
          
        }
        if(typeOfFood === 'pizzas') {
          newItem.sizes = sizes
        }

        if(typeOfFood === 'drinks'){
          newItem.size = drinkSize;
          newItem.type = drinkType;
        }

        if(typeOfFood !== 'pizzas'){
          newItem.price = singlePrice
        }

        if(typeOfFood !== 'drinks' && typeOfFood !== 'dipping') {
          newItem.description = description;
        }


        newList.push(newItem);

        newMenu[typeOfFood] = newList;
      

        await firebase.firestore()
          .collection('stores')
          .doc(userId)
          .update({
            menu: newMenu
          })
        updateStore({menu:newMenu, loading: false});
        setName('');
        setDescription('');
        setSize('');
        setSizes([]);
        setPrice('');
        setDrinkSize('');
        setDrinkType('');
        setSinglePrice('');
      
      
  
        } catch (error ) {
          console.log("error saving an item", error);
        }
      
    

      } else if ( action === 'edit') {
        
        try {
          const userId = props.restaurant.id;
          const { menu } = await getStore(userId);
          const newMenu = menu;

          let newList = newMenu[typeOfFood].filter( e => e.uuid !== uuid);

          let newItem = {
            name,
            
          }
          if(typeOfFood === 'pizzas') {
            newItem.sizes = sizes
          }

          if(typeOfFood === 'drinks'){
            newItem.size = drinkSize;
            newItem.type = drinkType;
          }

          if(typeOfFood !== 'pizzas'){
            newItem.price = singlePrice
          }

          if(typeOfFood !== 'drinks' && typeOfFood !== 'dipping') {
            newItem.description = description;
          }

          newList.push(newItem);
          newMenu[typeOfFood] = newList;

          await firebase.firestore()
            .collection('stores')
            .doc(userId)
            .update({
              menu: newMenu
            })

          updateStore({menu:newMenu, loading: false});

        
          }  catch (error ) {
          console.log("error saving an item", error);
        }
        
    }
    
    // props.updateStore({loading: false});
    setLoading(false);
    setToggle(!toggle);
  }
  return (
  <Card  >
    <CardActionArea>
      { typeOfFood === 'pizzas' &&
      <CardMedia
        style={{ backgroundColor: '#dddddd', height: 250}}
        image={''}
        title="Contemplative Reptile"
      >
        <Grid container justify="center" alignItems="center" style={{ height: '100%'}}>
          <Button
            variant="contained" 
            color="primary" 
            style={{ alignSelf: 'center', alignItems: 'center' }}
            component="label"
            disabled={true}
            >
              Upload Photo
            <input
              type="file"
              style={{ display: "none" }}
            />
          </Button>
        </Grid>
      </CardMedia>
      }
      <CardContent>
        <TextField
          inputProps={{ style:{fontSize: 25}}}
          value={name}
          onChange={ e => {
            setErrors({});
            setName(e.target.value)
          }}
          placeholder="Name"
          error={ notEmpty(errors) && errors.name !== undefined}
          helperText={notEmpty(errors) && errors.name !== undefined && "Please enter the item name."}
        />
        { typeOfFood !== 'drinks' && typeOfFood !=='dippings' &&
         <TextField
          multiline={true}
          inputProps={{ style:{fontSize: 15, color: 'grey', marginTop: 20}}}
          style={{  width: '100%' }}
          value={description}
          onChange={ e => {
            setErrors({});
            setDescription(e.target.value)
          }}
          placeholder={`Description`}
          error={notEmpty(errors) && errors.description !==undefined}
          helperText={notEmpty(errors) && errors.description !== undefined && "Please enter the item description."}
        />
        }
        { typeOfFood !== 'pizzas' &&
         <TextField
          inputProps={{ style:{fontSize: 15, marginTop: 20}}}
          style={{  width: '100%' }}
          value={singlePrice}
          onChange={ e => {
            setErrors({});
            setSinglePrice(e.target.value)
          }}
          placeholder={`Price`}
          error={notEmpty(errors) && errors.singlePrice !== undefined}
          helperText={notEmpty(errors) && errors.singlePrice !== undefined && errors.singlePrice}
        />
        }
        { typeOfFood === 'drinks' &&
         <TextField
          inputProps={{ style:{fontSize: 10, marginTop: 20}}}
          style={{  width: '100%' }}
          value={drinkSize}
          placeholder="Size e.g 500ml."
          onChange={ e => {
            setErrors({});
            setDrinkSize(e.target.value)
          }}
          error={notEmpty(errors) && errors.drinkSize !==undefined}
          helperText={notEmpty(errors) && errors.drinkSize !== undefined && errors.drinkSize}
        />
        }
        { typeOfFood === 'drinks' &&
         <TextField
          inputProps={{ style:{fontSize: 10, marginTop: 20}}}
          style={{  width: '100%' }}
          value={drinkType}
          placeholder="Type e.g Bottle."
          onChange={ e => {
            setErrors({});
            setDrinkType(e.target.value)
          }}
          error={notEmpty(errors) && errors.drinkType !==undefined}
          helperText={notEmpty(errors) && errors.drinkType !== undefined && errors.drinkType}
        />
        }



        { typeOfFood === 'pizzas' &&
   
        <Grid container direction="column" style={{ marginTop: 20}}>
        { sizes.length === 0 && 
          <Grid container justify="center">
            <p style={{color: 'red', alignSelf: 'center'}}>Add price for this item.</p>
          </Grid>
        }
        { !loading && sizes.length !== 0 && sizes.map((size, index) => (
          <Grid item xs key={index}>
            <Grid  container direction="row" justify="space-between">
        
                <p style={{ maxWidth: 40}}>
                 {size.size}
                </p>
              
                <p style={{  textAlign: 'right'}}>
                  ${size.price}
                </p>
              
                <DeleteOutlinedIcon fontSize="large"  color="secondary" onClick={(e) => {
                    onRemoveSize(size.size);
                }}/>
            </Grid>
          </Grid>
          ))}
         
          <Grid item xs>
            <Grid  container direction="row" justify="space-between" style={{ marginTop: 10}}>
        
             <TextField
                inputProps={{ style:{fontSize: 15}}}
                style={{ width: 50}}
                placeholder="Size"
                value={size || ''}
                onChange={(e) => {
                  setErrors({});
                  setSize(e.target.value);
                }}
                error={notEmpty(errors) && errors.size !== undefined}
                helperText={notEmpty(errors) && errors.size !== undefined && errors.size}
              />
              <TextField
                inputProps={{ style:{fontSize: 15}}}
                style={{ width: 50}}
                placeholder="Price"
                value={price || ''}
                onChange={(e) => {
                  setErrors({});
                  setPrice(e.target.value.trim());
                }}
                error={notEmpty(errors) && errors.price !== undefined}
                helperText={notEmpty(errors)&& errors.price !== undefined && errors.price}
              />  
              <Icon fontSize="large" color="primary" onClick={()=> onAddSize()} style={{ marginTop: 7}}>add_circle</Icon>
            </Grid>
          </Grid>
        </Grid>
        }
        
      </CardContent>
    </CardActionArea>

    <CardActions>
      <Grid container direction="row" justify="space-between">
        <Button size="small" color="primary" onClick={() => {
          let err = validateItem();
      
          if(!notEmpty(err)) {
            onSave();
          } else {
            setErrors(err);
          }
        }}>
          Save
        </Button>
        <Button size="small" color="secondary" onClick={() => loading? {} : setToggle(false)}>
          Cancel
        </Button>
      </Grid>
    </CardActions>
  </Card>

            
  )
})


export default subscribe()(PizzaCard);
