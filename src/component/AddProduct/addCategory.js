import React, {useState} from 'react'
import useForm from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import renderFields from 'mui-fields'
import {firestore} from "../../firebaseConfig";
import Button from "@material-ui/core/Button";

export default function AddCategory() {
    const [formValues, setFormValues] = useState(null)
    const methods = useForm()
    const history = useHistory();
    const _renderFieds = () => {
        return renderFields({
            nameCategory: {label: 'Tên Danh Mục', required: true, autoFocus: true},
        }, methods)
    }

    function to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    const _onSubmit = (data) => {
        console.log(data)
        setFormValues(data)
        try {
            firestore
                .collection('categories')
                .add({
                    name: data.nameCategory,
                    key: to_slug(data.nameCategory)
                })
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <form onSubmit={methods.handleSubmit(_onSubmit)} style={{margin: 20}}>
            {_renderFieds()}
            <div>
                <Button type={'submit'}>Submit</Button>
            </div>
            <div>
                <Button onClick={()=>{history.push('/')}} >Cancel</Button>
            </div>
            {/*{*/}
            {/*    formValues && <pre>{JSON.stringify(formValues, null, 2)}</pre>*/}
            {/*}*/}
        </form>
    )
}