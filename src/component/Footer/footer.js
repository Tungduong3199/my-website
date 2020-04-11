import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Footer(props) {
    return (
            <AppBar position="static" style={{marginTop: 20}}>
                <Grid container xs={12} sm={12} justify={"center"}>
                    <Toolbar style={{width: 1170, margin: "auto",height: 300}} variant="dense">
                        <Grid item sm={4}>
                            <Typography align={"center"} variant="h6" color="inherit">
                                Về chúng tôi
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography align={"center"} variant="h6" color="inherit">
                                Về chúng tôi
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography align={"center"} variant="h6" color="inherit">
                                Về chúng tôi
                            </Typography>
                        </Grid>
                    </Toolbar>
                </Grid>
            </AppBar>
    );
}

export default Footer;