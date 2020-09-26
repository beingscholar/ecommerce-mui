import { Box, Button, Link } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import payment from "../assets/img/payment-confirmed.svg";

const OrderConfirmComponent = () => {
  const history = useHistory();
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || "";
  let email = "";
  if (orderDetails) {
    email = orderDetails.email;
    let hide = email.split("@")[0].length - 0; //<-- number of characters to hide
    var r = new RegExp(".{" + hide + "}@", "g");
    email = email.replace(r, "******@");
    console.log(email);
  } else {
    history.push("/orders-list");
  }

  return (
    orderDetails && (
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
                        <Typography component="h3">
                          Payment Confirmed
                        </Typography>
                        <Typography component="span">
                          Order Number: {orderDetails.orderId}
                        </Typography>
                        <Typography>
                          We’ve sent a confirmation email to{" "}
                          <strong>{email}</strong> with order details
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
                    <Link component={RouterLink} to="/">
                      Continue Shopping &gt;
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    )
  );
};

export default OrderConfirmComponent;
