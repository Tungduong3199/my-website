import React, {useEffect, useState} from 'react';
import {fade,makeStyles} from '@material-ui/core/styles';
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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 15
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
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
            auth.onAuthStateChanged((user) => {
                if (user) {
                    firestore
                        .collection("user")
                        .doc(auth.currentUser.email)
                        .get()
                        .then((doc) => {
                            if (doc.exists) {
                                setName(doc.data().lastName);
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

    const avtName = name.trim().charAt(0);

    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Grid container sm={12} justify={"center"}>
                    <Grid item style={{width: 1170}}>
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Duong's Blog
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            {user ?
                                <Grid>
                                    <Button aria-controls="simple-menu" aria-haspopup="true"
                                            onClick={handleClick}>
                                        {user.photoURL ?
                                            <Avatar src={user.photoURL}/>
                                            :
                                            <Avatar>{avtName}</Avatar>
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
                                        <MenuItem
                                            onClick={() => {
                                                history.push('/AddCategory')
                                            }}>Thêm Danh Mục</MenuItem>
                                        <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
                                    </Menu>
                                </Grid>
                                :
                                <div>
                                    <Button onClick={() => {
                                        history.push('/SignIn')
                                    }} color={"inherit"}>Đăng nhập</Button>
                                    <Button onClick={() => {
                                        history.push('/SignUp')
                                    }} color={"inherit"}>Đăng ký</Button>
                                </div>
                            }
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
        </div>

    );
}