import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {auth, firestore} from '../../firebaseConfig'

function Profile(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    };

    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    };

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleClickCancle = () => {
        window.location.assign('/Home')
    }

    const handleClickUpdateProfile = () => {
        firestore.collection('user').doc(auth.currentUser.email)
            .update({
                displayName: firstName + ' ' + lastName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                add: address
            }).then((e) => {
            console.log(e)
            window.location.assign('/Home')
        })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <Grid item container style={{margin: 'auto'}} justify={'center'} xs={10} sm={3}>
            <h2 style={{textAlign: 'justify'}}>Edit Information</h2>
            <TextField fullWidth label="First Name" onChange={handleChangeFirstName}/>
            <TextField fullWidth label="Last Name" onChange={handleChangeLastName}/>
            <TextField fullWidth label="Email" onChange={handleChangeEmail}/>
            <TextField
                fullWidth
                label="Phone Number"
                onChange={handleChangePhoneNumber}
                type='number'
            />
            <TextField fullWidth label="Address" onChange={handleChangeAddress}/>
            <Grid style={{marginTop:20}}>
            <Button variant="contained" color="primary" onClick={handleClickUpdateProfile}>Update</Button>
            <Button variant="contained" color="primary" onClick={handleClickCancle}>Cancle</Button>
            </Grid>
        </Grid>
    );
}

export default Profile;