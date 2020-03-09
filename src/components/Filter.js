import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, TextField } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    display: 'flex',
    paddingLeft: theme.spacing(9)
  },

}));

export default function Filter(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState('name');
  const [search, setSearch] = React.useState('');
  const [searchedproduct, setSearchedProduct] = React.useState('')
  const { products } = props;



  const handleProductFilter = useCallback((event, value) => {
    setSort(value)
    console.log(event.target.value)
    props.handleFilter(event.target.value)
  }
  )


  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('ki')
      if (search) {
        setSearchedProduct(products.filter(product => product.productName.includes(search)));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [search]);




  console.log(products)
  return (
    <FormControl className={classes.formControl}>
      <h2>Sort By</h2>
      <Select
        native
        value={sort}
        onChange={e => handleProductFilter(e)}
        inputProps={{
          name: 'sort',
          id: 'age-native-simple',
        }}
      >
        <option value="name">Name</option>
        <option value="quantity">Quantity</option>
        <option value="timeAdded">Time Added</option>
      </Select>
      <br /><br />
      <TextField id="outlined" label="Search field" name="search" value={search} onChange={e => setSearch(e.target.value)} type="search" variant="outlined" />
      {products.map((item, key) => (
        <div key={key} style={{ display: 'flex' }}>
          <div> {item.productName} {item.productQuantity} {item.timestamp}</div><br />
      </div>))}
    </FormControl>
  );
}
