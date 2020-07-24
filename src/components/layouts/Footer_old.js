import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        textAlign:"center",
        paddingTop:theme.spacing(3),
    },

}))

export default function Footer(){
    const classes=useStyles();
    return(
        <div className={classes.root}>
            <Typography variant="subtitle1">Copyright © Your Website 2020.</Typography>
        </div>
    )
}