import { Link as RouterLink, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import logo from '../../assets/img/logo.png';
import { useUser } from '../utilities/user';

const Header = props => {
    const { push } = useHistory();
    const { user, logout } = useUser();

    const handleSignOut = async () => {
        await logout().then(() => window.location.replace('/signin'));
    };
    console.log(user);
    return (
        // <header className="primary-header">
        //   <div className=""
        // </header>
        <>
            <div className='topbar'>
                <Container maxWidth='lg'>
                    <ul>
                        <li>
                            <Link component={RouterLink} to='/'>
                                Sell on Hetchly
                            </Link>
                        </li>
                        <li>
                            <Link component={RouterLink} to='/'>
                                Track my order
                            </Link>
                        </li>
                        <li>
                            <Link component={RouterLink} to='/'>
                                Help Center
                            </Link>
                        </li>
                    </ul>
                </Container>
            </div>

            <header className='primary-header'>
                <Container maxWidth='lg'>
                    <div className='logo'>
                        <Link component={RouterLink} to='/'>
                            <img src={logo} alt='Logo' />
                        </Link>
                    </div>

                    <div className='search-box'>
                        <input
                            type='text'
                            placeholder='Search products &amp; brands...'
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                        >
                            <SearchIcon />
                        </Button>
                    </div>

                    <ul className='links'>
                        <li>
                            <Link component={RouterLink} to='/cart'>
                                <ShoppingCartOutlinedIcon />
                                Cart
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Link component={RouterLink} to='/profile'>
                                    <PersonOutlinedIcon />
                                    Profile
                                </Link>
                            ) : (
                                <Link component={RouterLink} to='/signin'>
                                    <PersonOutlinedIcon />
                                    Login
                                </Link>
                            )}
                        </li>
                        <li>
                            {user ? (
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disableElevation
                                    onClick={() => {
                                        handleSignOut();
                                    }}
                                    // to="/signup"
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disableElevation
                                    onClick={() => push('/signup')}
                                    // to="/signup"
                                >
                                    Sign up
                                </Button>
                            )}
                        </li>
                    </ul>
                </Container>
            </header>
        </>
    );
};

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string
};

export default Header;
