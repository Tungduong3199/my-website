import React, {useEffect, useState} from 'react';
import {auth, firestore} from "../../firebaseConfig";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom'
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    knot: {
        margin: '15px 10px'
    }
}));

function MyAccount(props) {

    const history = useHistory();
    const [user, setUser] = useState({});
    const classes = useStyles();

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = (data) => {
        try {
            console.log(auth)
            auth.onAuthStateChanged((user) => {
                if (user) {
                    firestore
                        .collection("user")
                        .doc(auth.currentUser.email)
                        .get()
                        .then((doc) => {
                            if (doc.exists) {
                                setUser({...doc.data()})
                            } else {
                                console.log('k co data')
                            }
                        }).catch((e) => {
                        console.log(e)
                    })
                }
            })
        } catch (e) {
            console.log(e.toString())
        }
    };
    console.log(user.photoURL)
    return (
        <Grid style={{margin: 'auto'}} justify={'center'} item sm={4} xs={10}>
            <h1>Thông Tin Tài Khoản</h1>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>Add: {user.address}</p>
            <Avatar alt="Remy Sharp" src={user.photoURL}/>
            <Button className={classes.knot} variant={'contained'} color={'primary'} onClick={() => {
                history.push('/Profile')
            }}>Update Profile</Button>
            <Button className={classes.knot} variant={'contained'} color={'primary'} onClick={() => {
                history.push('/')
            }}>Cancle</Button>
        </Grid>
    );
}

export default MyAccount;