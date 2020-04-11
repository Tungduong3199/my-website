import React, {useEffect, useState} from 'react';
import {firestore} from "../../../../firebaseConfig";
import MediaCard from "../../Product/producDetails";

function HoverData(props) {
    const [product, setProduct] = useState([]);
    const [category,setCategory] = useState('');
    const {cate} = props;
    console.log(category)

    const getDataProduct = async () => {
        setCategory(cate)
        try {
            const snapShot = await firestore
                .collection("products")
                .where('category', '==', category)
                .get()
            if (snapShot.size > 0) {
                let data = []
                snapShot.forEach(c => {
                    data.push(c.data())
                })
                setProduct([...data])
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getDataProduct()
    }, []);

    return (
        <div>
            {product.map((value) => <MediaCard product={value}/>)}
        </div>
    );
}

export default HoverData;