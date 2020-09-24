import React, { Fragment } from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({

}));

const OrderConfirmComponent = () => {

  return (
    <div>
      <Container maxWidth="md" spacing={1}>
        <Card>
          <CardContent>        
          <Grid container 
            direction="row" 
            alignItems="center"
          >
          
            <Grid item sm={5}>
              <Box mx="2em">

                <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            
                <Typography 
                  variant="h6"
                  align="center"
                >Payment Confirmed
                </Typography>

                <span>Order Number: 1234567899</span>
                
                <p>We've sent a confirmation email to e****@gmail.com with the order details</p>
              </Box>
            </Grid>
            
            <Grid item sm={1}>
              <Divider orientation="vertical"></Divider>
            </Grid>
            
            <Grid item 
              sm={5}>
              <Box mx="2em">
                <Typography variant="h6">Delivery Dates: : <span>July 4 -5</span></Typography>
                <p>For more details, track your delivery status under My Account > My Order</p>
                <Button
                  className="m-t-20"
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  type="submit"
                  component={RouterLink} 
                  to="/checkout"
                >
                  View Order
                </Button>
              </Box>
            </Grid>

            <Grid item 
              sm={12}
            >

            <Box my="2.5em">
              <Typography 
                variant="h6"
                align="center"
                ><Link
                  component={RouterLink} 
                  to="/"
                >Continue Shopping
                </Link>
              </Typography>  
            </Box>         
            
            </Grid>
          </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default OrderConfirmComponent;
