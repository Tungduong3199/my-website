import React from 'react';
import Grid from "@material-ui/core/Grid";
import avt from "../../../Images/avt.JPG";
import MediaCard from "./producDetails";

function Product(props) {
    return (
        <Grid item justify={'center'} container >
            <Grid item xs={12} sm={4} >
                <MediaCard image={avt} heading={'Do Duong'} content={'ko co gi de noi'}/>
            </Grid>
            <Grid item xs={12} sm={4} >
                <MediaCard image={avt} heading={'Do Duong'} content={'ko co gi de noi'}/>
            </Grid>
            <Grid item xs={12} sm={4} >
                <MediaCard image={avt} heading={'Do Duong'} content={'ko co gi de noi'}/>
            </Grid>
        </Grid>
    );
}

export default Product;