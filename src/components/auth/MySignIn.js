import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../utilities/user';

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

const MySignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(username, password) {
    try {
      // wait to see if login was successful (we don't care about the return
      // value here)
      await login(username, password);
      history.push('/');
    } catch (err) {
      // If an error occured, showcase the proper message (we customised the
      // message ourselves in `UserProvider`'s code)
      console.log(err);
    }
  }

  return (
    <section className='user-structure'>
      <div className='wrapper'>
        <p>
          New Member?{' '}
          <Link component={RouterLink} to='/signup'>
            Register
          </Link>{' '}
          here.
        </p>
        <div className='user-structure--box'>
          <h3>Welcome to Hetchly! Please Join.</h3>
          <ValidatorForm
            noValidate
            onSubmit={e => {
              e.preventDefault();
              handleSignIn(username, password);
            }}
          >
            <div className='form-group'>
              <label>Email*</label>
              <TextValidator
                autoComplete='off'
                variant='outlined'
                fullWidth
                required
                placeholder='Please enter your email'
                id='username'
                key='username'
                name='username'
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
                type='text'
                validators={['required', 'isEmail']}
                errorMessages={[
                  'This field is required',
                  'Please enter a valid email'
                ]}
              />
              {/* <TextField
                                id='outlined-basic'
                                label='Email'
                                placeholder='Please enter your email...'
                                variant='outlined'
                                required
                            /> */}
            </div>
            <div className='form-group'>
              <label>Password*</label>
              <TextValidator
                autoComplete='current-password'
                fullWidth
                required
                variant='outlined'
                id='password'
                key='password'
                name='password'
                placeholder='Please enter your password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                type='password'
                validators={['required']}
                errorMessages={['please enter a valid password']}
              />
              {/* <TextField
                                id='outlined-basic'
                                label='Password'
                                variant='outlined'
                                placeholder='Please enter your password...'
                                type='password'
                                required
                            /> */}
            </div>
            <div className='form-link'>
              <Link to='/'>Forgot Password?</Link>
            </div>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              type='submit'
            >
              Login
            </Button>
          </ValidatorForm>
        </div>
      </div>
    </section>
  );
};

export default MySignIn;
