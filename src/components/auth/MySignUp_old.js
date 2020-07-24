import React, { useState } from 'react';
import { Button, Typography,Link, Grid,Avatar, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useUser } from '../utilities/user';
import {Link as RouterLink,
        useHistory} from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

    avatar: {
      margin: "auto",
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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


const MySignUp = () =>{
    const history = useHistory();
    const { signup } = useUser();
    const [username, setUsername]=useState("");
    const [password,setPassword] = useState("")
    const [givenName, setGivenName] = useState("");
    const [familyName, setFamilyName] = useState("")

    const classes=useStyles();

    async function handleSignUp(username, password, givenName, familyName){
      try {
      
        // wait to see if login was successful (we don't care about the return
        // value here)
        await signup(username,password, givenName, familyName);
        history.push("/check-email");
      } catch (err) {
        
        // If an error occured, showcase the proper message (we customised the
        // message ourselves in `UserProvider`'s code)
        console.log(err);
      }

    }
    
    return(
      <Container maxWidth="xs">
              <CssBaseline/>
          <div className={classes.paper}>
          <Avatar className={classes.avatar}><AccountCircleIcon/></Avatar>
            <Typography variant="h5" align="center">Create Account</Typography>
        <ValidatorForm className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault(); handleSignUp(username, password, givenName, familyName)}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextValidator
            required
            autoFocus
            autoComplete="fname"
            variant="outlined"
            label = "Given Name"
            id="given_name"
            key="given_name"
            name="given_name"
            value={givenName}
            onChange={(e)=>{setGivenName(e.target.value)}}
            type="text"
            validators={['required']}
            errorMessages={['this field is required']}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
            autoComplete="lname"
            required
            variant="outlined"
            label = "Family Name"
              id="family_name"
              key="family_name"
              name="family_name"
              onChange={(e)=>{setFamilyName(e.target.value)}}
              value={familyName}
              type="text"

            />
          </Grid>
          <Grid item xs={12}>
              <TextValidator
              autoComplete="email"
              variant="outlined"
              fullWidth
              required
              label = "Email"
              id="username"
              key="username"
              name="username"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              type="text"
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'Email is not valid']}
              />
            </Grid>
          <Grid item xs={12}>

            <TextValidator
              required
              variant="outlined"
              autoComplete="current-password"
              label="Password"
              fullWidth
              id="password"
              key="password"
              name="password"
              value={password}
              onChange={e=>{setPassword(e.target.value)}}
              type="password"
            />
          </Grid>
            <Button
              className={classes.submit}
              fullWidth
              type="submit"
              onClick={()=>{}}
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
              <Link
                to='/signin'
                component={RouterLink}
              >
                Already have an account? Log In
              </Link>
              </Grid>

              </Grid>
        </Grid>
          
         
        </ValidatorForm>
        </div>
        </Container>
    );
}

export default MySignUp;