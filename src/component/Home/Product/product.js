import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import MediaCard from "./producDetails";
import {firestore} from "../../../firebaseConfig";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        flex: 1
    },
    product: {
        display: 'flex'
    }
});

function Product(props) {

    const classes = useStyles();
    const [product, setProduct] = useState([])
    const getDataProduct = (data) => {
        try {
            firestore
                .collection('products')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc)=>{

                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e.toString())
        }
    };

    useEffect(() => {
        getDataProduct()
    }, []);

    return (
        <Grid className={classes.root} container justify={'center'}>
            <Grid className={classes.product} container item xs={12} sm={10}  spacing={3}>
                {product.map((value) => <MediaCard product={value}/>)}
            </Grid>
        </Grid>
    );
}

export default Product;