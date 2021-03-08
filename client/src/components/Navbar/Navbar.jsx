import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Button, Grid, Link, Slide, useScrollTrigger} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    link: {
        textDecoration: "none"
    },
    profile: {
        width: "48px"
    },
    nav: {
        display: "flex",
        justifyContent: "center"
    },
    navLinks: {
        textDecoration: "none",
        fontSize: "14px",
        color: "#fff",
        fontWeight: 700
    }
}));


const Navbar = () => {
    const {logout} = useContext(AuthContext)
    const trigger = useScrollTrigger({target: window ? window : undefined});
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Slide appear={false} direction="down" in={!trigger}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar className={classes.toolbar}>
                            <Grid container className={classes.nav}>
                                <Button>
                                    <NavLink to="/links" className={classes.navLinks}>Links</NavLink>
                                </Button>
                                <Button>
                                    <NavLink to="/create" className={classes.navLinks}>Create</NavLink>
                                </Button>
                            </Grid>
                            <Grid container justify="flex-end" className={classes.profile}>
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link href="#" onClick={logout} variant="body1" color="error">
                                                Logout
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </div>
            </Slide>
        </div>
    );
};

export default Navbar;
