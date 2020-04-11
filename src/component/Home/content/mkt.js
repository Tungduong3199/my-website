import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {firestore} from "../../../firebaseConfig";
import MediaCard from "../Product/producDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        width: 1170,
        margin: 'auto'
    },
    product: {
        display: 'flex'
    }
});

function Mkt(props) {

    const classes = useStyles();
    const [product, setProduct] = useState([])

    const getDataProduct = async (data) => {
        try {
            const snapShot = await firestore
                .collection("products")
                .where('category', '==', 'marketing')
                .get()
            if (snapShot.size > 0) {
                let data = []
                snapShot.forEach(c => {
                    data.push(c.data())
                })
                setProduct([...data])
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getDataProduct()
    }, []);

    return (
        <Grid container justify={"center"} xs={12} sm={12} style={{marginTop: 20, width: 1170}}>
            <Grid item xs={12} sm={12}>
                <AppBar style={{width: 1170,margin: "auto"}} position="static">
                    <Toolbar  variant="dense">
                        <Typography variant="h6" color="inherit">
                            Marketing
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item spacing={1} className={classes.root} container={1} justify={"flex-start"}>

                {product.map((value) => <MediaCard product={value}/>)}

            </Grid>
        </Grid>
    );
}

export default Mkt;