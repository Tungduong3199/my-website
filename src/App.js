import React, {useState} from 'react';
import './App.css';
import Index from "./component/Home";
import {
    BrowserRouter as Switch,
    Route,
} from "react-router-dom";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import Profile from "./component/Profile/profile";
import myAccount from "./component/Profile/myAccount";
import AddProduct from "./component/AddProduct/addProduct";
import {auth} from "./firebaseConfig";

function App() {
    //
    // const [check, setCheck] = useState(false);
    //
    // const readly = async () => {
    //     auth.currentUser.
    // }
    return (
        <Switch>
            <Route exact path={'/'} component={Index}/>
            <Route path={'/Login'} component={Login}/>
            <Route path={'/Home'} component={Home}/>
            <Route path={'/Profile'} component={Profile}/>
            <Route path={'/MyAccount'} component={myAccount}/>
            <Route path={'/AddProduct'} component={AddProduct}/>
        </Switch>
    );
}

export default App;
