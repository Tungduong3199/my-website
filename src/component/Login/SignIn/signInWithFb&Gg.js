import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from 'react-router-dom'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};

const useStyles = makeStyles({
    newSignUp: {
        cursor: 'pointer',
        color: 'blue',
        marginTop: 10,
        textAlign: 'center'
    }
})

function SignUpWithGgFb() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div>
            <Typography className={classes.newSignUp} variant={'subtitle2'} onClick={()=>{history.push('/SignUp')}}>Đăng ký tài khoản mới</Typography>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    );
}
export default SignUpWithGgFb