import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {firestore} from "../../../firebaseConfig";
import MediaCard from "../Product/producDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({

    product: {
        display: 'flex',
        width: 1170
    }
});

function Cntt(props) {

    const classes = useStyles();
    const [product, setProduct] = useState([])

    const getDataProduct = async () => {
        try {
            const snapShot = await firestore
                .collection("products")
                .where('category', '==', 'cong-nghe-thong-tin')
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
console.log(product)
    useEffect(() => {
        getDataProduct()
    }, []);

    return (
        <Grid container justify={"center"} xs={12} style={{marginTop: 20, width: 1170}}>
            <Grid item xs={12} sm={12}>
                <AppBar style={{width: 1170,margin: "auto"}} position="static">
                    <Toolbar  variant="dense">
                        <Typography variant="h6" color="inherit">
                            Công nghệ thông tin
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item style={{margin: "auto",width: 1170}} spacing={1} container={1} justify={"flex-start"}>
                {product.map((value) => <MediaCard product={value}/>)}
            </Grid>
        </Grid>

    );
}

export default Cntt;