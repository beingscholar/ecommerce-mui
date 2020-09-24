import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Button, 
    Link, 
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box } from '@material-ui/core';

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Auth } from "aws-amplify";
import { trackPromise } from "react-promise-tracker";
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/customers";

const PRODUCT_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const CART_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";


function getModalStyle() {
  return {
    margin: "auto"
  };
}

const useStyles = makeStyles(theme => ({

}));

const ReviewOrder = () => {
const classes=useStyles();

return (
    <div>
        <Box my="1.5em">
            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item md={1}>
                    <DirectionsBikeOutlinedIcon></DirectionsBikeOutlinedIcon>
                </Grid>
                <Grid item md={11}>
                    <span>Standard Delivery: Estimated time of Arrival 2-5 July</span>
                </Grid>
            </Grid>
        </Box>
        <div>                          
        <Card className={classes.orderCard}>
            <CardContent>
            <Grid container direction="column" alignItems="center" spacing={4}>

                <Grid container item direction="row" alignItems="center" spacing={4}>
                    <Grid item>
                    <h3>Order Summary</h3>
                    </Grid>
                </Grid>
                <Grid container item direction="row" alignItems="center" spacing={4}>
                    <Grid item md={9}>
                    <p>Subtotal (x) items</p>
                    </Grid>
                    <Grid item md={3}>
                    <p>USD 690</p>
                    </Grid>
                </Grid>
                <Grid container item direction="row" alignItems="center" spacing={4}>
                    <Grid item md={9}>
                    <p>Shipping Fee</p>
                    </Grid>
                    <Grid item md={3}>
                    <p>USD 10</p>
                    </Grid>
                </Grid>
                <Grid container item direction="row" alignItems="center" spacing={4}>
                    <Grid item md={9}>
                    <h3>Total</h3>
                    </Grid>
                    <Grid item md={3}>
                    <h3>USD 700</h3>
                    </Grid>
                </Grid>
            </Grid>
            </CardContent>
        </Card>
        </div>  
    </div>


)

};

export default ReviewOrder;
