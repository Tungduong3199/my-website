import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import avt from '../../Images/avt.JPG'
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Content from "./content";
import {makeStyles} from "@material-ui/core/styles";
import {auth, firestore, storage} from "../../firebaseConfig"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    }
}));

function Home(props) {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

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

                    <Button aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}>
                        <Avatar alt="Remy Sharp">D</Avatar>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Link style={{textDecoration: 'none'}} to={'/profile'}><MenuItem onClick={handleClose}>Chỉnh Sửa Thông Tin</MenuItem></Link>
                        <Link style={{textDecoration: 'none'}} to={'/MyAccount'}><MenuItem onClick={handleClose}>Thông Tin TK</MenuItem></Link>
                        <Link style={{textDecoration: 'none'}} to={'/AddProduct'}> <MenuItem onClick={handleLogout}>Thêm Sản Phẩm</MenuItem></Link>
                        <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Content/>
        </div>
    );
}

export default Home;