import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Switch
} from 'react-router-dom';
import {
  ShoppingCartOutlined as ShoppingCartIcon,
  PersonOutlined as SignInIcon
} from '@material-ui/icons';

import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import Cart from './carts/Cart';
import CheckEmail from './auth/CheckEmail';
import Checkout from './Checkout';
import CustomerBillings from './customers/CustomerBillings';
import CustomerProfile from './customers/CustomerProfile';
import CustomerEditForm from './customers/CustomerEditForm';
import ChangePassword from './customers/ChangePassword';
import PaymentMethod from './customers/PaymentMethod';

import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Landing from './Landing';
import Link from '@material-ui/core/Link';
import MySignIn from './auth/MySignIn';
import MySignUp from './auth/MySignUp';
import Aboutus from './Aboutus';
import PrivateRoute from './utilities/PrivateRoute';
import ProductProfile from './products/ProductProfile';
import Products from './products/Products';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { trackPromise } from 'react-promise-tracker';
import { useUser } from './utilities/user';

// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const url =
  'http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products';

const useStyles = makeStyles(theme => ({
  navLink: {
    margin: theme.spacing(2),
    fontSize: '1rem'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  authLinks: {
    position: 'relative',

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

function Main() {
  const { user, logout } = useUser();
  const classes = useStyles();
  const handleSignOut = async () => {
    await logout().then(() => window.location.replace('/signin'));
  };

  var navLinks = (
    <Typography variant='h6'>
      <Link
        className={classes.navLink}
        color='inherit'
        component={RouterLink}
        to='/'
      >
        Home
      </Link>
      <Link
        className={classes.navLink}
        color='inherit'
        component={RouterLink}
        to='/signup'
      >
        Sign Up
      </Link>
      <Link
        className={classes.navLink}
        color='inherit'
        component={RouterLink}
        to='/signin'
      >
        Sign In
      </Link>
      <Link
        className={classes.navLink}
        color='inherit'
        component={RouterLink}
        to='/cart'
      >
        <span style={{ verticalAlign: 'middle' }}>
          <ShoppingCartIcon />
        </span>
      </Link>
    </Typography>
  );
  if (user) {
    navLinks = (
      <Typography variant='h6'>
        <Link
          className={classes.navLink}
          color='inherit'
          component={RouterLink}
          to='/'
        >
          Home
        </Link>
        <Link
          className={classes.navLink}
          color='inherit'
          component={RouterLink}
          to={'/profile'}
        >
          Profile
        </Link>
        <Link
          className={classes.navLink}
          color='inherit'
          component={RouterLink}
          to='/cart'
        >
          <span style={{ verticalAlign: 'middle' }}>
            <ShoppingCartIcon />
          </span>
        </Link>

        <Link
          className={classes.navLink}
          color='inherit'
          onClick={() => {
            handleSignOut();
          }}
        >
          Sign Out
        </Link>
      </Typography>
    );
  }
  const sections = [
    { title: 'Sell on Hetchly', url: '#' },
    { title: 'Track my order', url: '#' },
    { title: 'Help Center', url: '#' }
  ];

  const navbarLinks = [
    { title: 'Cart', url: 'cart', icon: <ShoppingCartIcon /> },
    { title: 'Login', url: 'signin', icon: <SignInIcon /> }
  ];

  return (
    <Router>
      <Header title='Blog' sections={sections} navbarLinks={navbarLinks} />
      <Switch>
        <Route path='/signin'>
          <MySignIn />
        </Route>
        <Route path='/about-us'>
          <Aboutus />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/signup'>
          <MySignUp />
        </Route>
        <Route path='/check-email'>
          <CheckEmail />
        </Route>
        <PrivateRoute path='/checkout' component={Checkout} />
        <Route
          path='/products/:id'
          render={props => <ProductProfile {...props} />}
        />
        <PrivateRoute path='/profile' component={CustomerProfile} />
        <PrivateRoute path='/edit-profile' component={CustomerEditForm} />
        <PrivateRoute path='/change-password' component={ChangePassword} />
        <PrivateRoute path='/payment-method' component={PaymentMethod} />
        <PrivateRoute path='/billings' component={CustomerBillings} />
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/products' component={Products} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default Main;
