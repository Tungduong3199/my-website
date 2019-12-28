import React, {useState} from 'react'
import useForm from 'react-hook-form'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import {auth, firestore} from "../../firebaseConfig"
import renderFields from 'mui-fields'
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export default function SignUp() {

    const history = useHistory();
    const [formValues, setFormValues] = useState(null)
    const [error, setError] = useState('')
    const methods = useForm()
    const [show, setShow] = useState(false)

    const _renderFieds = () => {
        return renderFields({
            firstName: {label: 'First Name', fullWidth: false, required: true, autoFocus: true},
            lastName: {label: 'Last Name', fullWidth: false, required: true, autoFocus: true},
            phoneNumber: {label: 'Phone Number', required: true, autoFocus: true},
            address: {label: 'Address', required: true, autoFocus: true},
            email: {label: 'Email', required: true, autoFocus: true},
            password: {
                label: 'Password',
                type: show ? 'text' : 'password',
                required: true,
                InputProps: {
                    shrink: true,
                    startAdornment: <InputAdornment
                        position="start"> </InputAdornment>,
                    endAdornment: <InputAdornment
                        style={{width: 50}}
                        position="end">
                        {
                            !show ?
                                <VisibilityOffOutlinedIcon
                                    onClick={() => setShow(!show)}
                                />
                                :
                                <VisibilityOutlinedIcon
                                    onClick={() => setShow(!show)}
                                />
                        }
                    </InputAdornment>,
                }

            },
            confirmPassword: {
                label: 'ConfirmPassword',
                type: show ? 'text' : 'password',
                required: true,
                InputProps: {
                    shrink: true,
                    startAdornment: <InputAdornment
                        position="start"> </InputAdornment>,
                    endAdornment: <InputAdornment
                        style={{width: 50}}
                        position="end">
                        {
                            !show ?
                                <VisibilityOffOutlinedIcon
                                    onClick={() => setShow(!show)}
                                />
                                :
                                <VisibilityOutlinedIcon
                                    onClick={() => setShow(!show)}
                                />
                        }
                    </InputAdornment>,
                }
            },
        }, methods)
    }

    const _onSubmit = async (data) => {
        setFormValues(data)
        try {
            const result = await auth.createUserWithEmailAndPassword(data.phoneNumber, data.email, data.password)
            if (result) {
                console.log('signUp', data)
                firestore.collection('user').doc(data.email)
                    .set({
                        email: data.email,
                        password: data.password,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        displayName: data.firstName + ' ' + data.lastName,
                        phoneNumber: data.phoneNumber,
                        address: data.address
                    })
                history.push('/')
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Grid item xs={10} sm={4} style={{margin: 'auto'}}>
            <form onSubmit={methods.handleSubmit(_onSubmit)}>
                <Typography variant={"h4"} style={{textAlign: 'center', fontFamily: 'UTM Avo'}}> Please Sign
                    up </Typography>
                {_renderFieds()}
                {
                    error &&
                    <Typography style={{color: 'red'}}> {error} </Typography>
                }
                <Typography variant={"subtitle1"}>Đã có tài khoản <Button onClick={() => {
                    history.push('/SignIn')
                }} color={"primary"}>Đăng nhập</Button></Typography>
                <div style={{textAlign: 'center'}}>
                    <Button type={'submit'} variant="contained" color="primary" style={{marginTop: 10, width: 140}}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </Grid>
    )
}