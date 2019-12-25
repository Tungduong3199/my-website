import React from 'react';
import Product from "./Product/product";
import Grid from "@material-ui/core/Grid";

function Content(props) {
    return (
        <div>
            <Grid container style={{marginTop: 30}}>
                <Product/>
                <Product/>
                <Product/>
            </Grid>
        </div>
    );
}

export default Content;