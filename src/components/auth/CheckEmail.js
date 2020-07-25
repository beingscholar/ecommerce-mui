import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import TextField from '@material-ui/core/TextField';
import check from '../../assets/img/check.png';
import { useUser } from '../utilities/user';

export default function CheckEmail() {
    const [state, setState] = React.useState({});

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const { confirmRegister } = useUser();
    async function handleConfirmRegister(username, code) {
        try {
            // wait to see if login was successful (we don't care about the return
            // value here)
            await confirmRegister(username, code).then(response => {
                NotificationManager.success(
                    'Succesfully verified user. You may now sign in to your account.'
                );
            });
        } catch (err) {
            // If an error occured, showcase the proper message (we customised the
            // message ourselves in `UserProvider`'s code)
            NotificationManager.error(err.message);
        }
    }
    return (
        <section className='user-structure'>
            <div className='wrapper'>
                <div className='user-structure--box'>
                    <img src={check} alt='Check' />
                    <h3 className='m-0'>Confirmation email sent! </h3>
                    <p>
                        Please check confirmation sent to your email and enter
                        the code sent to your email.
                    </p>
                    <ValidatorForm
                        onSubmit={e => {
                            e.preventDefault();
                            handleConfirmRegister(username, code);
                        }}
                    >
                        <div className='form-group'>
                            <label>Email*</label>
                            <TextValidator
                                autoComplete='off'
                                variant='outlined'
                                fullWidth
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
                            {/* <TextField
                                id='outlined-basic'
                                label='Code'
                                variant='outlined'
                                placeholder='Please enter your code...'
                                required
                            /> */}
                            <label>Code*</label>
                            <TextValidator
                                autoComplete='off'
                                variant='outlined'
                                fullWidth
                                placeholder='Please enter your code'
                                id='code'
                                key='code'
                                name='code'
                                value={code}
                                onChange={e => {
                                    setCode(e.target.value);
                                }}
                                type='text'
                                validators={['required']}
                                errorMessages={['please enter a valid code']}
                            />
                        </div>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            type='submit'
                        >
                            Confirm Email
                        </Button>
                    </ValidatorForm>
                    <p className='m-t-15'>
                        Didn’t receive the email?{' '}
                        <span>
                            click{' '}
                            <Link component={RouterLink} to='/check-email'>
                                here
                            </Link>{' '}
                            to resend
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}
