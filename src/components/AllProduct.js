import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableContainer,TableBody,TableCell,TableHead,TableRow,Typography,IconButton} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    head: {
        paddingLeft: theme.spacing(14),
        paddingTop:theme.spacing(3),
    }
}));

export default function AllProduct(props) {
    const classes = useStyles();
    const {products}=props;

    products.pop();
    products.pop();


    const List = React.memo(({ products }) => {
        return products.map((product, i) => (
            <TableRow key={i}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productQuantity}</TableCell>
                <TableCell>{product.timestamp}</TableCell>
                <TableCell align="right"><IconButton onClick={e => DeleteProduct(i)}><Delete /></IconButton></TableCell>
            </TableRow>
        ));
    });

    const DeleteProduct = (i) => {
        console.log(i)
        props.deleteProduct(i)
    }
    console.log(products)
    return (<>
        <Typography component="h1" variant="h5" className={classes.head}>
            All Products
        </Typography>
        <TableContainer className={classes.container}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                        <TableCell>Product Quantity</TableCell>
                        <TableCell>Product Timestamp</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <List products={products}/>
                    </TableBody>
                </Table>
                </TableContainer></>
  );
}
