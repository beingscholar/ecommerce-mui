import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Button, 
    Link, 
    Grid,
    Card,
    CardContent,
    Box } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

//icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import StayCurrentPortraitOutlinedIcon from '@material-ui/icons/StayCurrentPortraitOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/customers";

function getModalStyle() {
  return {
    margin: "auto"
  };
}

const useStyles = makeStyles(theme => ({

}));

const ShippingDetails = () => {
const classes=useStyles();


return (
    <div>
        <Box mb="1.5em">
            <span>Shipping Details</span>
        </Box>

        <Grid container direction="row" alignItems="center" spacing={5}>
            <Grid item md={1}>
                <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
            </Grid>
            <Grid item md={9}>
                <h3>Maria Dela Cruz</h3>
                <p>Metro Manila, Quezon City, Quezon City, Project 6</p>
            </Grid>
            <Grid item md={2}>
                <Link to=''>Edit</Link>
            </Grid>
        </Grid>

    
        <Grid container direction="row" alignItems="center" spacing={5}>
            <Grid item md={1}>
                <ReceiptOutlinedIcon></ReceiptOutlinedIcon>
            </Grid>
            <Grid item md={9}>
                <h3>Default to Billing Address</h3>
            </Grid>
            <Grid item md={2}>
                <Link to=''>Edit</Link>
            </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={5}>
            <Grid item md={1}>
                <StayCurrentPortraitOutlinedIcon></StayCurrentPortraitOutlinedIcon>
            </Grid>
            <Grid item md={9}>
                <h3>9124556770</h3>
            </Grid>
            <Grid item md={2}>
                <Link to=''>Edit</Link>
            </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={5}>
            <Grid item md={1}>
                <MailOutlinedIcon></MailOutlinedIcon>
            </Grid>
            <Grid item md={9}>
                <h3>mariadelacruz@gmail.com</h3>
            </Grid>
            <Grid item md={2}>
                <Link to=''>Edit</Link>
            </Grid>
        </Grid>
        
    </div>
  );
};

export default ShippingDetails;
