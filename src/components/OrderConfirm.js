import { Box, Button, Link } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import payment from "../assets/img/payment-confirmed.svg";

const OrderConfirmComponent = () => {
  const history = useHistory();
  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Box className="primary-structure--content">
          <Grid container justify="center">
            <Grid item sm={12} md={10} lg={8}>
              <Box className="primary-structure--box payment-confirmation">
                <Grid container alignItems="center">
                  <Grid item sm={6}>
                    <Box className="payment-info">
                      <img src={payment} alt="Payment" />
                      <Typography component="h3">Payment Confirmed</Typography>
                      <Typography component="span">
                        Order Number: 1234567889
                      </Typography>
                      <Typography>
                        We’ve sent a confirmation email to{" "}
                        <strong>******@gmail.com</strong> with order details
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box className="delivery-info">
                      <Typography>
                        &nbsp;
                        {/* <strong>Delivery dates: July 4 - 5</strong> */}
                      </Typography>
                      <Typography>
                        For more details, track your delivery status under{" "}
                        <strong>My Account &gt; My Order</strong>
                      </Typography>
                      <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                        onClick={() => history.push("/orders-list")}
                      >
                        View Order
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box className="continue-shopping">
                  <Link component={RouterLink} to="/">Continue Shopping &gt;</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderConfirmComponent;
