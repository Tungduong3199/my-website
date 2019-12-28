import React, {useEffect, useState} from 'react'
import useForm from 'react-hook-form'
import {auth, firestore, storage} from "../../firebaseConfig"
import renderFields from 'mui-fields'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";

export default function () {

    const history = useHistory();
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const methods = useForm();
    const [user, setUser] = useState({});
    const [photoURL, setPhotoURL] = useState('')
    const [uploadProgress, setUploadProgress] = useState('')

    const handleChangePhotoURL = (event) => {
        let file = event.target.files[0]
        console.log(event.target.files)

        const imageRef = storage.ref().child('images/' + file.name);
        const uploadTask = imageRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress)
            }, function (e) {
                switch (e.code) {
                    case 'storage/unauthorized':

                        setUploadProgress('storage/unauthorized')
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        setUploadProgress('storage/canceled')
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        setUploadProgress('storage/unknown')
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (photoURL) {
                    console.log('File available at', photoURL);
                    setPhotoURL(photoURL)
                });
            });
    };

    const _renderFieds = () => {
        return renderFields({
            firstName: {label: 'First Name', fullWidth: false, required: true, autoFocus: true},
            lastName: {label: 'Last Name', fullWidth: false, required: true, autoFocus: true},
            phoneNumber: {label: 'Phone Number', required: true, autoFocus: true},
            address: {label: 'Address', required: true, autoFocus: true},
            email: {label: 'Email', required: true},
        }, methods)
    }

    const _onSubmit = async (data) => {
        // setFormValues(data)
        try {
            console.log(auth)
            await
                firestore.collection('user').doc(data.email)
                    .update({
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        displayName: data.firstName + ' ' + data.lastName,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        photoURL: photoURL
                    })
                    .then(() => {
                        auth.currentUser.updateProfile({displayName, photoURL})
                        console.log(photoURL)
                        history.push('/MyAccount')
                    })
        } catch (e) {
            console.log(e)
        }
    };

    const handleClickCancle = () => {
        history.push('/')
    };

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

    return (
        <Grid item sm={4}>
            <form onSubmit={methods.handleSubmit(_onSubmit)} style={{margin: 'auto'}}>
                <Typography style={{textAlign: 'center', color: 'purple', fontFamily: 'UTM Avo', fontSize: 20}}>Chỉnh
                    sửa thông tin</Typography>
                {_renderFieds()}
                {
                    error &&
                    <Typography style={{color: 'red'}}> {error} </Typography>
                }
                <input accept={'image/*'} type="file" onChange={handleChangePhotoURL} />
                <Avatar src={photoURL}/>
                <div style={{textAlign: 'center'}}>
                    <Button type={'submit'} variant="contained" color="primary" style={{marginTop: 10, width: 140}}>
                        Update
                    </Button>
                    <Button type={'submit'} onClick={handleClickCancle} variant="contained" color="primary"
                            style={{marginTop: 10, width: 140}}>
                        Cancle
                    </Button>
                </div>

            </form>
        </Grid>
    )
}