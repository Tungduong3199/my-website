import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Login2 from "../SignIn/signInWithFb&Gg";
import {auth} from "../../../firebaseConfig";
import {useGlobal} from "reactn";
import {useHistory} from 'react-router-dom'

function SignIn() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [userId, setUserId] = useGlobal('global');


    const handleChangePassWord = (e) =>{
        setPassWord(e.target.value);
        console.log(passWord);
    };

    const handleChangeName = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };

    const handleLogin = ()=>{
        console.log(email,passWord,"begin");
        auth.signInWithEmailAndPassword(email,passWord)
            .then((callback)=>{
                window.localStorage.setItem("userId",auth.currentUser.uid)
                history.push('/');
                console.log(callback,"callback")
            }).catch(function (err) {
            console.log(err)
        })
    };

    return (
        <Grid item justify={'center'} style={{margin: 'auto'}} container xs={10} >
            <h1>Sign In</h1>
            <TextField fullWidth id="standard-required" label="User Name" onChange={handleChangeName}/>

            <TextField
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                style={{margin:"7px 0 20px 0"}}
                onChange={handleChangePassWord}
            />

            <Button size="medium" color="primary" onClick={handleLogin}>
                Sign In
            </Button>

            <Button size="medium" color="primary" onClick={()=>{history.push('/')}}>
                Cancle
            </Button>
            <Login2/>
        </Grid>
    );
}

export default SignIn;