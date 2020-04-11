import React, {useEffect, useState} from 'react'
import useForm from 'react-hook-form'
import {auth, firestore, storage} from "../../firebaseConfig"
import renderFields from 'mui-fields'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import firebase from "firebase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import uuid from 'uuid/v4'

const useStyles = makeStyles({
    inputImg: {
        cursor: 'pointer',
        border: '1px solid blue',
        borderRadius: 10,
        color: 'blue',
        padding: '10px 10px'
    }
})
export default function SignUp() {
    const classes = useStyles()
    const history = useHistory();
    const [formValues, setFormValues] = useState(null)
    const [progress, setProgress] = useState('')
    const methods = useForm()
    const [photoURLProduct, setPhotoURLProduct] = useState('')
    const [category, setCategory] = useState([])

    const _renderFieds = () => {
        return renderFields({
            nameProduct: {label: 'Tên sản phẩm', fullWidth: false, required: true, autoFocus: true},
            price: {label: 'Giá sản phẩm', type: 'number', required: true, autoFocus: true},
            category: {
                label: 'Chủ đề',
                select: true,
                selections: [
                    {code: 'am-nhac', name: 'Âm nhạc'},
                    {code: 'ngoai-ngu', name: 'Ngoại ngữ'},
                    {code: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin'},
                    {code: 'the-thao---suc-khoe', name: 'Thể thao - sức khỏe'},
                    {code: 'thiet-ke-do-hoa', name: 'Thiết kế đồ họa'},
                    {code: 'marketing', name: 'Marketing'},
                ],
                mapKey: opt => opt.code,
                mapValue: opt => opt.code,
                mapLabel: opt => opt.name,
            }
        }, methods)
    }

    const _onSubmit = async (data) => {
        // console.log(data)
        setFormValues(data)
        try {
            firestore
                .collection('products')
                .doc('product'+ uuid())
                .set({
                    nameProduct: data.nameProduct,
                    price: data.price,
                    photoURLProduct: photoURLProduct,
                    email: auth.currentUser.email,
                    category: data.category
                })
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    };

    const handleChangeImgProduct = (event) => {
        let file = event.target.files[0]
        const uploadTask = storage.ref().child('images/' + file.name).put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + 1;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (photoURL) {
                    console.log('File available at', photoURL);
                    setPhotoURLProduct(photoURL)
                });
            });
    }

    const showImg = () => {
        if (progress >= 1 && progress < 101) {
            return <CircularProgress style={{marginTop: 30}}/>
        } else if (photoURLProduct) {
            return <img src={photoURLProduct} style={{width: 100, height: 100, marginTop: 15}}/>
        } else {
            return <div style={{display: 'none'}}></div>
        }
    }

    return (
        <Grid item xs={10} sm={4} style={{margin: 'auto'}}>
            <form onSubmit={methods.handleSubmit(_onSubmit)}>
                <Typography variant={"h4"} style={{textAlign: 'center', fontFamily: 'UTM Avo'}}> Nhập thông tin sản
                    phẩm </Typography>
                {_renderFieds()}
                <div style={{marginTop: 15}}>
                    <input style={{display: 'none'}} id="img" type="file" onChange={handleChangeImgProduct}/>
                    <label htmlFor="img" className={classes.inputImg}>
                        Thêm ảnh sản phẩm
                    </label>
                    <div>
                        {showImg()}
                    </div>
                </div>

                <div style={{textAlign: 'center'}}>
                    <Button type={'submit'} color="primary" style={{marginTop: 10, width: 140}}>
                        Thêm sản phẩm
                    </Button>
                    <Button onClick={() => {
                        history.push('/')
                    }} color="primary" style={{marginTop: 10, width: 140}}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Grid>
    )
}