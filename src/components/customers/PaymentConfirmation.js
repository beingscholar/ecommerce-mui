import { Box, Button, ButtonGroup, CardMedia, Link } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import masterCard from "../../assets/img/mastercard.svg";
import security from "../../assets/img/security.svg";
// import user from "../../assets/img/user.jpg";
import userDefaultImg from "../../assets/img/user-default-image.png";
import { CUSTOMER_URL } from "../../config/apiUrl";
import history from "../utilities/history";
import CustomerMenu from "./CustomerMenu";
import payment from "../../assets/img/payment-confirmed.svg";

function getModalStyle() {
  return {
    margin: "auto",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomerProfile = () => {
  const [user_id, setUser_id] = useState("");
  const [customer, setCustomer] = useState("");
  const [profilePic, setProfilePic] = useState(userDefaultImg);

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then((user) => {
        setUser_id(user.attributes.sub);
        fetch(CUSTOMER_URL + "/" + user.attributes.sub)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCustomer(data.customer);
            setProfilePic(data.customer.profilePhotoUrl);
          })
          .catch((error) => {
            alert(error);
          });
      })
    );
  }, []);

  if (customer) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      birthDate,
      profilePhotoUrl,
    } = customer;

    const {
      address_1,
      address_2,
      city,
      state,
      country,
      zipcode,
    } = customer.address;

    var customerData = (
      <Grid item xs={12} sm={8} lg={5} className="user-profile-spacing">
        <Typography component="h3">{firstName + " " + lastName}</Typography>
        <Typography>
          <Typography component="strong">Email Address: </Typography>
          {email}
        </Typography>
        <Typography>
          <Typography component="strong">Address: </Typography>
          {/* Metro Manila Quezon City, Quezon City, Project 6 */}
          {!Object.keys(customer.address).length
            ? ""
            : address_1 +
              ", " +
              address_2 +
              ", " +
              city +
              ", " +
              state +
              ", " +
              country +
              " - " +
              zipcode}
        </Typography>
        <Typography>
          <Typography component="strong">Birthday: </Typography>
          {new Date(birthDate).toLocaleDateString("fr-CA")}
        </Typography>
        <Typography>
          <Typography component="strong">Gender: </Typography>
          {gender}
        </Typography>
        <Typography>
          <Typography component="strong">Phone Number: </Typography>
          {phoneNumber.replace(/(\+\d{2})\d{9}/, "$1*******")}
        </Typography>
      </Grid>
    );
  }
  const { firstName } = customer || "";
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
                        <strong>******@mail.com</strong> with order details
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box className="delivery-info">
                      <Typography>
                        <strong>Delivery dates: July 4 - 5</strong>
                      </Typography>
                      <Typography>
                        For more details, track your delivery status under{" "}
                        <strong>My Account > My Order</strong>
                      </Typography>
                      <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                      >
                        View Order
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box className="continue-shopping">
                  <Link to="/">Continue Shopping ></Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomerProfile;
