import React, {useEffect, useState} from 'react';
import {auth, firestore} from "../../firebaseConfig";
import Grid from "@material-ui/core/Grid";

function MyAccount(props) {

    const [user, setUser] = useState({});

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = async (data) => {
        // firestore.collection('user')
        //     .doc('xpvYVPzTSiZ9Xfi1SeMmpmXnw7s1')
        //     .get()
        //     .then(function (doc) {
        //         if (doc.exists) {
        //             console.log("Document data:", doc.data());
        //             setUser({...doc.data()})
        //         } else {
        //             // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // });
        try {
            await firestore
                .collection("user")
                .doc(auth.currentUser.email)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        setUser({...doc.data()})
                    } else {
                        console.log('k co data')
                    }
                })

        } catch (e) {
            console.log(e.toString())
        }
    };
console.log(auth.currentUser)
    return (
        <Grid style={{margin:'auto'}} justify={'center'} item sm={4} xs={10}>
            <h1>Thông Tin Tài Khoản</h1>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>Add: {user.add}</p>
            <input accept={'image/*'}/>
        </Grid>
    );
}

export default MyAccount;