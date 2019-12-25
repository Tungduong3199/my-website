import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {auth, firestore} from '../../firebaseConfig';
import {useHistory} from 'react-router-dom'

export default function SignUp() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [add, setAdd] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangeFirstName(e) {
        setFirstName(e.target.value)
    }

    function handleChangeLastName(e) {
        setLastName(e.target.value)
    }

    function handleChangePhoneNumber(e) {
        setPhoneNumber(e.target.value)
    }

    function handleChangeAdd(e) {
        setAdd(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    const handleClickSignUp = () => {
            console.log('start')
        auth.createUserWithEmailAndPassword(email, password)
            .then((data) => {
                console.log(data,'aaaa')
                firestore.collection('user')
                    .doc(email)
                    .set({
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        displayName: firstName + ' ' + lastName,
                        phoneNumber: phoneNumber,
                        add: add,
                        password: password
                    })
                console.log('end')
                history.push('/Home')
            }).catch((e) => {
            console.log(e)
        })
    }

    const handleClickCancle = () => {
        history.push('/Login')
    }
    return (
        <Grid item justify={'center'} style={{margin: 'auto'}} container xs={10}>
            <h1>Sign Up</h1>
            <Grid style={{margin: '20px 0'}}>
                <TextField fullWidth label={'First Name'} onChange={handleChangeFirstName}/>
                <TextField fullWidth label={'Last Name'} onChange={handleChangeLastName}/>
                <TextField fullWidth required label={'Email'} onChange={handleChangeEmail}/>
                <TextField fullWidth label={'Số điện thoại'} onChange={handleChangePhoneNumber} type={'number'}/>
                <TextField fullWidth label={'Địa chỉ'} onChange={handleChangeAdd}/>
                <TextField fullWidth required label={'Mật khẩu'} type={'password'} onChange={handleChangePassword}/>
            </Grid>
            <Button variant={'outlined'} color={'primary'} onClick={handleClickSignUp}>Sign Up</Button>
            <Button variant={'outlined'} color={'primary'} onClick={handleClickCancle}>Cancle</Button>
        </Grid>
    )
}