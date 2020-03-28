import React, { useState, useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, Divider } from '@material-ui/core';
import AddProduct from './AddProduct';
import Filter from './Filter';
import Search from './Search';
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



const Home = React.memo(() => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState();
  console.log("reseting", products);


  ////////////Add //////////
  const addProduct = useCallback((productName, productQuantity) => {
    setProducts(products => [...products, { productName, productQuantity, timestamp: new Date() }])
    // setFilteredProducts(products => [...products, { productName, productQuantity, timestamp: new Date().toString() }])
  })

  ///////////Delete/////////
  const deleteProduct = useCallback((e, index) => {
    e.preventDefault()
    setProducts(products.filter((ele, i) => index !== i))
    setFilteredProducts(filteredProducts.filter((ele, i) => index !== i))
  }, [products, filteredProducts])

  ////////search////////
  const searchedData = useCallback((result, key) => {
    if (key) {
      setFilteredProducts(result)
    } else {
      setFilteredProducts([]);
    }
    setSearchKey(key)
  }, [])


  //////Filter List/////////
  const saveFilteredItems = useCallback(
    sortedItems => {
      if (searchKey) {
        setFilteredProducts(sortedItems);
      } else {
        setProducts(sortedItems);
      }
    },
    [searchKey]
  );


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
          <Grid><Search products={products} searchedData={searchedData} /></Grid>
          <Divider />
          {filteredProducts.length > 0 && searchKey ? (
            <Filter
              items={filteredProducts}
              saveFilteredItems={saveFilteredItems}
            />
          ) : filteredProducts.length === 0 && searchKey ? null : (
            <Filter items={products} saveFilteredItems={saveFilteredItems} />
          )}
          <Divider />
          <Grid item >
           
            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                <AllProduct products={filteredProducts} deleteProduct={deleteProduct} />
              ) : filteredProducts.length === 0 && searchKey ? (
                <div style={{ color: "red", margin: "20px" }}>No Result Found</div>
              ) : (
                    <AllProduct products={products} deleteProduct={deleteProduct} />
                  )
            ) : null}

          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
)
export default Home