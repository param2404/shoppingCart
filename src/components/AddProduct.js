import React, { useState, useRef, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Progress from './Loader';
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

const AddProduct = React.memo((props) => {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [Loader,setLoader]=useState(false)
  const classes = useStyles();
  const inputRef = useRef();
  const { addProduct } = props;


  const onSubmit = useCallback((event) => {
    event.preventDefault();
    setTimeout(()=>{
      addProduct(productName, productQuantity);
      setLoader(false)
    }, 500)
    setLoader(true)
    setProductName('')
    setProductQuantity('')
  },[productQuantity,productName,addProduct])

  useEffect(() => {
    inputRef.current.focus();
  },[inputRef])


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
            inputRef={inputRef}
            required
            id="productName"
            label="Product Name"
            name="productName"
            value={productName}
            onChange={e => setProductName(e.target.value)}
           
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
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
          </Button>
      </form>
      {Loader ? (
        <div>
          <Progress />
        </div>
      ) : ""}
    </Grid>
  );
})

export default AddProduct;