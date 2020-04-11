import React from 'react';
import './App.css';
import Home from "./component/Home/home";
import {
    Switch,
    Route,
} from "react-router-dom";
import Profile from "./component/Profile/profile";
import myAccount from "./component/Profile/myAccount";
import AddProduct from "./component/AddProduct/addProduct";
import SignIn from "./component/Login/SignIn/signIn";
import SignUp from "./component/Login/signUp";
import AddCategory from "./component/AddProduct/addCategory";
import Course from "./component/Home/Product/course";

function App() {

    return (
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/SignIn'} component={SignIn}/>
            <Route path={'/SignUp'} component={SignUp}/>
            <Route path={'/Profile'} component={Profile}/>
            <Route path={'/MyAccount'} component={myAccount}/>
            <Route path={'/AddProduct'} component={AddProduct}/>
            <Route path={'/AddCategory'} component={AddCategory}/>
            <Route path={'/course'} component={Course}/>
        </Switch>
    );
}

export default App;
