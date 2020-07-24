import React, { useState } from 'react';
import { Button, Typography, Divider,Grid } from '@material-ui/core';
import { useUser } from '../utilities/user';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(theme => ({
    root: {
         '& .MuiTextValidator-root': {
         margin: theme.spacing(2),
         flexGrow:1,
         },
         padding:1.5+"em",
         border:"thin solid #d3d3d3"
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    avatar: {
      margin: "auto",
      backgroundColor: theme.palette.secondary.main,
    },

    paper: {
      padding:1.5+"em",
      border:"thin solid #d3d3d3",
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

}));



export default function CheckEmail(){
    const classes=useStyles();
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const { confirmRegister } = useUser();
    async function handleConfirmRegister(username, code){
        try {
        
          // wait to see if login was successful (we don't care about the return
          // value here)
          await confirmRegister(username,code).then(response=>{NotificationManager.success("Succesfully verified user. You may now sign in to your account.")});
        } catch (err) {
          
          // If an error occured, showcase the proper message (we customised the
          // message ourselves in `UserProvider`'s code)
          NotificationManager.error(err.message);
        }
  
      }
    return(
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >

            <Grid item xs={5} style={{padding: "2em", border:"thin solid #d3d3d3"}}>
                <Typography variant="h3" >Confirmation email sent.</Typography>
                <Divider/>
                <Typography variant="h5" paragraph>Please check confirmation sent to your email and enter the code sent to your email.</Typography>
                <ValidatorForm className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault();handleConfirmRegister(username, code)}}>
                    <Grid container spacing={2}>
                        <Grid item xs ={12}>
                            <TextValidator 
                            autoComplete="email"
                            label = "Email"
                            variant="outlined"
                            fullWidth
                            required
                            id="username"
                            key="username"
                            name="username"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            type="text"
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <TextValidator 
                            label = "Code"
                            variant="outlined"
                            fullWidth
                            required
                            id="code"
                            key="code"
                            name="code"
                            value={code}
                            onChange={(e)=>{setCode(e.target.value)}}
                            type="text"
                            />
                        </Grid>
                        <Button
                        className={classes.submit}
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        >
                            Confirm Email
                        </Button>
                    </Grid>
                </ValidatorForm>
            </Grid>
        </Grid>
    )
}