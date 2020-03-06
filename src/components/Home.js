import React, { useState, useCallback} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper,Container,Divider} from '@material-ui/core';
import AddProduct from './AddProduct';
import Filter from './Filter';
import AllProduct from './AllProduct';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    alignItems: 'center',
    padding:theme.spacing(2),
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  head: {
    paddingTop:theme.spacing(2),
    paddingLeft: theme.spacing(12),
  }
}));



export default function Home() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  

  const addProduct = useCallback((productName, productQuantity,timestamp) => 
    setProducts(products=>[...products,productName,productQuantity,timestamp])
  ,[])
  
  const deleteProduct = useCallback((i) => {
    console.log(i)
    setProducts([...products,products.filter(( index ) => index !== i)])
  })


 
  return (
    <Container fixed component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
          <Grid container >
          <Typography component="h1" variant="h5" className={classes.head}>
          SHOPPING CART
        </Typography>
         <Divider />
          <Grid item ><AddProduct addProduct={addProduct}/></Grid>
         <Divider />
          <Grid item ><Filter products={products}/></Grid>
         <Divider />
          <Grid item ><AllProduct products={products} deleteProduct={deleteProduct}/></Grid>
        </Grid>
      </Paper>
    </Container>
  );
}