import firebase from "firebase"
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBFeQok1m5YgMCA2xAcSZjNZm7rLSyRxR4",
    authDomain: "duong-dep-trai-18c3f.firebaseapp.com",
    databaseURL: "https://duong-dep-trai-18c3f.firebaseio.com",
    projectId: "duong-dep-trai-18c3f",
    storageBucket: "duong-dep-trai-18c3f.appspot.com",
    messagingSenderId: "591642600320",
    appId: "1:591642600320:web:f0781d7582643b9d441765",
    measurementId: "G-4QJBP58291"
};

const defautFirebase = firebase.initializeApp(firebaseConfig)

const auth = defautFirebase.auth()
const firestore = defautFirebase.firestore()
const storage = defautFirebase.storage()

export {
    auth, firestore, storage
}
