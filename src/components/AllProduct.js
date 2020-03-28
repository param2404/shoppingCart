import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
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
        paddingTop: theme.spacing(3),
    }
}));

const AllProduct = React.memo((props) => {
    const classes = useStyles();
    const { products, deleteProduct } = props;
    console.log("all Product", props);

  


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
                        {/* <TableCell>Product Timestamp</TableCell> */}
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, i) => (
                        <TableRow key={i} id={i}>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.productQuantity}</TableCell>
                            {/* <TableCell>{product.timestamp}</TableCell> */}
                            <TableCell align="right" onClick={e => deleteProduct(e, i)}><Delete /></TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
})
export default AllProduct