import React from 'react';
import Cntt from "./cntt";
import Mkt from  './mkt';
import Music from "./music";
import Grid from "@material-ui/core/Grid";

function Content(props) {
    return (
        <Grid container justify={'center'}>
            <Cntt/>
            <Mkt/>
            <Music/>
        </Grid>
    );
}

export default Content;