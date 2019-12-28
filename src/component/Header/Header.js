import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {auth, firestore} from "../../firebaseConfig";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        border: '1px double white'
    }
}));

export default function ButtonAppBar() {

    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [name, setName] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        auth
            .signOut()
            .then(function () {
                window.location.assign('/')
            }).catch(function (error) {
            console.log(error)
        });
    };

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(
            (user) => {
                // console.log(user)
                setUser(user)
            }
        );
        return () => {
            unregisterAuthObserver()
        }
    }, []);
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
                                console.log(doc.data().lastName);
                                setName(doc.data().lastName);
                                console.log(name)
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
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Duong's Blog
                    </Typography>
                    {user ?
                        <Grid>
                            <Button aria-controls="simple-menu" aria-haspopup="true"
                                    onClick={handleClick}>
                                {user.photoURL ?
                                    <Avatar src={user.photoURL}/>
                                    :
                                    <Avatar>D</Avatar>
                                }
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => {
                                        history.push('/MyAccount')
                                    }}>Thông Tin TK</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        history.push('/AddProduct')
                                    }}>Thêm Sản Phẩm</MenuItem>
                                <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
                            </Menu>
                        </Grid>
                        :
                        <div>
                            <Button onClick={() => {
                                history.push('/SignIn')
                            }} color={"inherit"} >Đăng nhập</Button>
                            <Button onClick={() => {
                                history.push('/SignUp')
                            }} color={"inherit"}>Đăng ký</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}