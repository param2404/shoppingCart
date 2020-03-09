import React, { useState, useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, Divider } from '@material-ui/core';
import AddProduct from './AddProduct';
import Filter from './Filter';
import AllProduct from './AllProduct';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    alignItems: 'center',
    padding: theme.spacing(2),

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
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(12),
  }
}));



const Home = React.memo(
  () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([products])
    console.log("reseting", products);



    const addProduct = async(productName, productQuantity) => {
      await setProducts(products => [...products, { productName, productQuantity, timestamp: new Date().toString() }])
      setFilteredProducts(products)
    }


    const deleteProduct = async(e, index) => {
      e.preventDefault()
      await setProducts(products.filter((ele, i) => index !== i),
      setFilteredProducts(products)

      )
    }

    console.log(filteredProducts)
    const handleFilter = useCallback((sort) => {
      console.log(sort)
      switch (sort) {
        case 'name':

          setFilteredProducts(filteredProducts.sort((a, b) => (a.productName > b.productName) ? 1 : (a.productName === b.productName) ? ((a.productQuantity > b.productQuantity) ? 1 : -1) : -1))
          break;
        case 'quantity':

          setFilteredProducts(filteredProducts.sort((a, b) => (a.productQuantity > b.productQuantity) ? 1 : (a.productQuantity === b.productQuantity) ? ((a.productName > b.productName) ? 1 : -1) : -1))
          break;
        case 'timestamp':

          setFilteredProducts(filteredProducts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1))
          break;
        default:

          setFilteredProducts(filteredProducts.sort((a, b) => (a.productName > b.productName) ? 1 : (a.productName === b.productName) ? ((a.productQuantity > b.productQuantity) ? 1 : -1) : -1))
          break;
      }
    }
    )

    return (
      <Container fixed component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Grid container >
            <Typography component="h1" variant="h5" className={classes.head}>
              SHOPPING CART
        </Typography>
            <Divider />
            <Grid item ><AddProduct addProduct={addProduct} /></Grid>
            <Divider />
            <Grid item ><Filter products={filteredProducts} handleFilter={handleFilter} /></Grid>
            <Divider />
            <Grid item ><AllProduct products={products} deleteProduct={deleteProduct} /></Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
)
export default Home