import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {firestore} from "../../../firebaseConfig";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: 30
    },
    media: {
        height: 240,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
const [product,setProduct]=useState('');
const [price,setPrice]=useState(0);
    // const getDataProduct = () => {
    //     console.log(firestore)
    //     firestore
    //         .collection("product")
    //         .get()
    //         .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //         });
    //     });}
    //
    // useEffect(()=>{
    //     getDataProduct()
    // },[]);

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary">
                    Buy
                </Button>
                <Button size="medium" color="primary">
                    Cart
                </Button>
            </CardActions>
        </Card>
    );
}