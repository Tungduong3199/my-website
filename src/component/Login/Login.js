import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import SignIn from './SignIn/signIn'
import Button from "@material-ui/core/Button";
import SignUp from "./signUp";

function Login(props) {
    const [show, setShow] = useState(0);

    function ShowLogin() {
        if (show === 0) {
            return <SignIn/>
        } else {
            return <SignUp/>
        }
    }

    return (
        <Grid item style={{margin: 'auto', marginTop: 30}} container justify={'center'} sm={3}>

                <Button variant='contained' color='primary' onClick={()=>setShow(0)}>Sign In</Button>
                <Button variant='contained' color='primary' onClick={()=>setShow(1)}>Sign Up</Button>

            <ShowLogin/>
        </Grid>
    );
}

export default Login;