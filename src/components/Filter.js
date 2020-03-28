import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import { FormControl, Select, TextField } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    display: 'flex',
    paddingLeft: theme.spacing(9)
  },

}));



const Filter=React.memo((props) => {
  const classes = useStyles();
  const [sort, setSort] = React.useState('');
  const { items, saveFilteredItems } = props;

  const sortItems = useCallback(() => {
    let sortedItems = [...items]
    switch (sort) {   
      case 'name':
        sortedItems.sort((a, b) => (a.productName > b.productName) ? 1 : (a.productName === b.productName) ? ((a.productQuantity > b.productQuantity) ? 1 : -1) : -1)
        saveFilteredItems(sortedItems);
        break;
      case 'quantity':
        sortedItems.sort((a, b) => (a.productQuantity > b.productQuantity) ? 1 : (a.productQuantity === b.productQuantity) ? ((a.productName > b.productName) ? 1 : -1) : -1)
        saveFilteredItems(sortedItems);
        break;
      case 'timeAdded':
        sortedItems.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        saveFilteredItems(sortedItems);
        break;
      default:
        sortedItems.sort((a, b) => (a.productName > b.productName) ? 1 : (a.productName === b.productName) ? ((a.productQuantity > b.productQuantity) ? 1 : -1) : -1)
        saveFilteredItems([]);
        break;
    }

})

  useEffect(() => {
  sortItems(sort)
},[sort])


  return (
    <FormControl className={classes.formControl}>
      <Select
        native
        value={sort}
        onChange={e=>setSort(e.target.value)}
        inputProps={{
          name: 'sort',
          id: 'age-native-simple',
        }}
      > 
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="quantity">Quantity</option>
        <option value="timeAdded">Time Added</option>
      </Select>
      
    </FormControl>
  );
})


export default Filter;