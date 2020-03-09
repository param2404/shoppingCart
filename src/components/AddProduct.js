import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Divider } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    alignItems: 'center',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  addproduct: {
    paddingLeft: theme.spacing(9),
  },
  submit: {
    margin: theme.spacing(2),
    float: 'right'
  },
  head: {
    paddingLeft: theme.spacing(14),
  }
}));

export default function AddProduct(props) {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const classes = useStyles();
  const { addProduct } = props;


  const onSubmit = (event) => {
    event.preventDefault();
    addProduct(productName, productQuantity);
    setProductName('')
    setProductQuantity('')
  }

  return (
    <Grid container >
      <Divider />
      <Typography component="h1" variant="h5" className={classes.head}>
        Add Product
        </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid className={classes.addproduct}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="productName"
            label="Product Name"
            name="productName"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="productQuantity"
            label="Product Quantity"
            type="number"
            id="productQuantity"
            value={productQuantity}
            onChange={e => setProductQuantity(e.target.value)}
          /></Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
          </Button>
      </form>
    </Grid>
  );
}