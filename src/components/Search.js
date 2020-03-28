import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl,TextField } from '@material-ui/core';


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
    const [search, setSearch] = React.useState('');
    const [searchedproduct, setSearchedProduct] = React.useState()
    const { products } = props;

    const searching = useCallback(() => {
        setSearchedProduct(products.filter(product => product.productName.includes(search)));
    }, [search, products])

    useEffect(() => {
        const timer = setTimeout(() => {
            searching();
        }, 3000);
        return () => clearTimeout(timer);
    }, [search,searching]);


 

  
    useEffect(() => {
        props.searchedData(searchedproduct,search)
    },[searchedproduct,search,searchedproduct])
    return (
        <FormControl className={classes.formControl}>
          
            <TextField id="outlined" label="Search field" name="search" value={search} onChange={e => setSearch(e.target.value)} type="search" variant="outlined" />

        </FormControl>
    );
}