import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {firestore} from "../../../../firebaseConfig";
import {CircularProgress} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../../Product/producDetails";
import HoverData from "./hoverData";

const useStyles = makeStyles({
    li: {
        listStyleType: 'none',
        lineHeight: 2,
        position: 'relative',
        cursor: 'pointer',
        "& > ul": {
            position: 'absolute',
            left: '100%',
            top: 0,
            minWidth: 220,
            backgroundColor: '#fff',
            zIndex: 2,
            display: 'none'
        },
        '&:hover': {
            backgroundColor: 'gray'
        },
        "&:hover > ul": {
            display: 'block',
        },
    },
    root: {
        marginTop: 0,
    }
});

function ListTopic(props) {
    const classes = useStyles();
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])

    const getDataCategory = async () => {
        setLoading(true)
        try {
            const snapShot = await firestore
                .collection("categories")
                .get()
            if (snapShot.size > 0) {
                let data = []
                snapShot.forEach(c => {
                    data.push(c.data())
                })
                setCategory([...data])
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getDataCategory()
    }, [])

    const listItems = () => {
        return (
            category && category.length !== 0 && category.map((value) =>
                <li className={classes.li} key={value.key}>{value.name}
                    <ul className={classes.subcate}>
                        <li><HoverData cate={value.key}/></li>
                    </ul>
                </li>
            )
        )
    };

    return (
        <ul className={classes.root}>
            <Typography variant="h6" gutterBottom>
                Danh Mục
            </Typography>
            {
                loading ? <CircularProgress/>
                    :
                    listItems()
            }

        </ul>
    );
}

export default ListTopic;