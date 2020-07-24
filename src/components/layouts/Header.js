import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    withStyles,
    createStyles,
    fade
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { InputBase, InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    toolbar: {
        backgroundColor: '#e8e8e8',
        fontFamily: 'Roboto, system-ui, sans-serif',
        minHeight: 45
    },
    toolbarTitle: {
        flex: 1
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
        minHeight: 100,
        verticalAlign: 'center'
    },
    toolbarLink: {
        padding: theme.spacing(4),
        flexShrink: 0,
        // fontSize: '1rem',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    navBar: {
        padding: '15px 30px'
    },
    navbarLink: {
        textTransform: 'capitalize',
        color: '#00a0ff',
        display: 'inline-flex',
        alignItems: 'center',
        paddingRight: '20px',
        textShadow: '1px 1px 1px #2d262642'
    },
    signupBtn: {
        color: '#fff',
        backgroundColor: '#00a0ff',
        borderRadius: '40px',
        boxSizing: 'border-box',
        padding: '15px 30px',
        verticalAlign: 'top',
        textShadow: '1px 1px 1px #2d262642'
    },
    searchBtn: {
        width: 50,
        display: 'inline-flex',
        backgroundColor: '#505050',
        color: 'fff'
    },
    formContainer: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    textField: {
        borderRadius: 40,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 600,
        padding: '10px 0px 10px 30px'
    },
    input: {
        '&&&:before': {
            borderBottom: 'none'
        },
        '&&:after': {
            borderBottom: 'none'
        }
    }
}));

const StyledButton = withStyles({
    root: {
        backgroundColor: '#505050',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 55,
    },
    label: {
        textTransform: 'capitalize'
    }
})(Button);

const Header = props => {
    const classes = useStyles();
    const { sections, navbarLinks } = props;
    var navLinks = (
        <Typography align='right' className={classes.navBar}>
            {navbarLinks.map(navbarLink => (
                <Link
                    color='inherit'
                    noWrap
                    key={navbarLink.title}
                    component={RouterLink}
                    to={navbarLink.url}
                    underline='none'
                    className={classes.toolbarLink}
                >
                    <span className={classes.navbarLink}>
                        {navbarLink.icon}
                        {navbarLink.title}
                    </span>
                </Link>
            ))}
            <Link
                component={RouterLink}
                className={classes.signupBtn}
                to='/signup'
                variant='contained'
                underline='none'
            >
                Sign up
            </Link>
        </Typography>
    );
    return (
        <header>
            <CssBaseline />
            {/* <AppBar
                position='absolute'
                color='default'
                className={classes.mainBar}
            > */}
            <Toolbar className={classes.toolbar}>
                <Typography
                    color='inherit'
                    align='right'
                    noWrap
                    className={classes.toolbarTitle}
                >
                    {sections.map(section => (
                        <Link
                            className={classes.toolbarLink}
                            color='inherit'
                            key={section.title}
                            component={RouterLink}
                            to='/'
                            underline='none'
                        >
                            {section.title}
                        </Link>
                    ))}
                </Typography>
            </Toolbar>
            <Toolbar className={classes.toolbarSecondary}>
                <Typography variant='h6' color='inherit'>
                    Company name
                </Typography>
                <Typography align='center' className={classes.formContainer}>
                    <TextField
                        id='search-bar'
                        placeholder='Search products & Brands'
                        className={classes.textField}
                        margin='normal'
                        id='outlined-password-input'
                        // variant="outlined"
                        InputProps={{
                            className: classes.input,
                            endAdornment: (
                                <InputAdornment>
                                    <StyledButton startIcon={<SearchIcon />} />
                                </InputAdornment>
                            )
                        }}
                    />
                </Typography>
                {navLinks}
            </Toolbar>
        </header>
    );
};

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string
};

export default Header;
