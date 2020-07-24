import React, { useState } from 'react';
import { Button, Typography, Link, Grid,Avatar, Container, CssBaseline } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles } from '@material-ui/core/styles';
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


const MySignIn = () =>{
  const history = useHistory();
  const { login } = useUser();
    const [username, setUsername]=useState("");
    const [password,setPassword] = useState("")

    const classes=useStyles();

    async function handleSignIn(username, password){
      try {
      
        // wait to see if login was successful (we don't care about the return
        // value here)
        await login(username,password);
        history.push("/");
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
        <Avatar className={classes.avatar}><LockOpenIcon/></Avatar>
            <Typography variant="h5" align="center">Sign In</Typography>
            <ValidatorForm className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault();handleSignIn(username, password)}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
          <Grid item xs={12}>

            <TextValidator
              autoComplete="current-password"
              fullWidth
              required
              variant="outlined"
                label="Password"
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
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#"
                /*  onClick={() => super.changeState("forgotPassword")} */
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to='/signup'
                  component={RouterLink}
                >
                No account? Sign up
                </Link>
              </Grid>
            </Grid>
              
          </Grid>
        </ValidatorForm>
        </div>
      </Container>
        
        
    );
}

export default MySignIn;