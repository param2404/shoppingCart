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
  const [searchedproduct,setSearchedProduct]=React.useState('')
  const { products } = props;


  // const List = React.memo(({ products }) => {
  //   return products
  // }); 

  const handleChange = useCallback((event) => {
    setSort(event.target.value)
    switch (sort) {
      case 'name':
        products.sort((a, b) => (a.productName > b.productName) ? 1 : (a.productName === b.productName) ? ((a.productQuantity > b.productQuantity) ? 1 : -1) : -1)
        break;
      case 'quantity':
        products.sort((a, b) => (a.productQuantity > b.productQuantity) ? 1 : (a.productQuantity === b.productQuantity) ? ((a.productName > b.productName) ? 1 : -1) : -1)
        break;
      case 'timestamp':
        products.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        break;
      default:
        break;
    }
  }
)


  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('ki')
      setSearchedProduct(products.filter(product => product.productName.includes(search)));
    }, 3000);
    return () => clearTimeout(timer);
  }, [search]);




  return (
    <FormControl className={classes.formControl}>
      <h2>Sort By</h2>
      <Select
        native
        value={sort}
        onChange={handleChange}
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

      {/* <List products={products}/> */}
    </FormControl>
  );
}
