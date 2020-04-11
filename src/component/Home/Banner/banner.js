import React from 'react';
import Grid from "@material-ui/core/Grid";
import ListTopic from "./ListTopic/ListTopic";
import Slider from "./slider";
import {Paper} from "@material-ui/core";
import anh1 from '../../../Images/255x160_2__1.png'
import anh2 from '../../../Images/255x160_3_.png'
import anh3 from '../../../Images/255x160_4_.png'

function Banner(props) {
    return (
        <Grid container justify={'center'} sm={12} spacing={1} style={{marginTop: 20, width: 1170, margin: 'auto'}}>
            <Grid item xs={12} sm={3}>
                <Paper>
                    <ListTopic/>
                </Paper>
            </Grid>
            <Grid item alignItems={"center"} xs={12} sm={6} style={{height: 550}}>
                <Slider/>
            </Grid>
            <Grid container={1} justify={"space-between"} direction={"column"} alignItems={"flex-end"} item xs={12}
                  sm={3}>
                <img src={anh1}/>
                <img src={anh2}/>
                <img src={anh3}/>
            </Grid>
        </Grid>
    );
}

export default Banner;