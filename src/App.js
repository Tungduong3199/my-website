import React from 'react';
import './App.css';
import Index from "./component/Home";
import {
    Switch,
    Route,
} from "react-router-dom";
import Profile from "./component/Profile/profile";
import myAccount from "./component/Profile/myAccount";
import AddProduct from "./component/AddProduct/addProduct";
import SignIn from "./component/Login/SignIn/signIn";
import SignUp from "./component/Login/signUp";

function App() {

    return (
        <Switch>
            <Route exact path={'/'} component={Index}/>
            <Route path={'/SignIn'} component={SignIn}/>
            <Route path={'/SignUp'} component={SignUp}/>
            <Route path={'/Profile'} component={Profile}/>
            <Route path={'/MyAccount'} component={myAccount}/>
            <Route path={'/AddProduct'} component={AddProduct}/>
        </Switch>
    );
}

export default App;
