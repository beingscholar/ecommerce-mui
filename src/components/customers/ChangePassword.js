import { Box, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { trackPromise } from "react-promise-tracker";
import { Link as RouterLink, useHistory } from "react-router-dom";
import back from "../../assets/img/back.svg";
import { CUSTOMER_URL } from "../../config/apiUrl";
import CustomerMenu from "./CustomerMenu";

function getModalStyle() {
  return {
    margin: "auto"
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      flexGrow: 1
    }
  },
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  tableHead: {
    fontWeight: "bold"
  }
}));

const ChangePassword = () => {
  const history = useHistory();
  const [customer, setCustomer] = useState();
  const [modalStyle] = React.useState(getModalStyle);
  const [user_id, setUser_id] = useState("");
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("2017-05-24");
  const [gender, setGender] = useState("Female");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        setUser_id(user.attributes.sub);
        fetch(CUSTOMER_URL + "/" + user.attributes.sub)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setCustomer(data.customer);
          })
          .catch(error => {
            alert(error);
          });
      })
    );
  }, []);
  function refreshCustomerList() {
    trackPromise(
      fetch(CUSTOMER_URL + "/" + user_id)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setCustomer(data.customer);
        })
    );
  }

  const handleEdit = customer => {
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    //setEmail(customer.email);
    //setUsername()
    var cBirthDate = customer.birthDate.split("T");
    setBirthDate(cBirthDate[0]);
    setGender(customer.gender);
    setPhoneNumber(customer.phoneNumber);
    setPhotoURL(customer.profilePhotoUrl);
    //custAcctNo
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditSubmit = (
    firstName,
    lastName,
    birthDate,
    gender,
    phoneNumber,
    photoURL
  ) => {
    var data = {
      firstName: firstName,
      lastName: lastName,
      email: customer.email,
      userName: customer.userName,
      birthDate: birthDate + "T00:00:00.000000",
      gender: gender,
      custAccountNo: customer.custAccountNo,
      phoneNumber: phoneNumber,
      profilePhotoUrl: photoURL
    };
    console.log(JSON.stringify(data));
    var newURL = CUSTOMER_URL + "/" + customer.customerId;
    fetch(newURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 404 || response.status === 400) {
          NotificationManager.error(
            "Error editing customer " +
              customer.customerId +
              ". Please ensure all fields are correct."
          );
          return response.json();
        }
        NotificationManager.success(
          "Successfully edited customer " + customer.customerId
        );
        refreshCustomerList();
      })
      .catch(error => {
        console.error("Error:", error);
      });
    handleClose();
  };

  const props = {
    label: "Edit My Account",
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    phoneNumber,
    setPhoneNumber,
    photoURL,
    setPhotoURL,
    handleSubmit: handleEditSubmit,
    handleClose
  };

  if (customer) {
    var customerData = (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Customer: {customer.firstName + " " + customer.lastName}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(customer)}
            >
              Edit My Account
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/billings"
            >
              My Billings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div style={{ marginBottom: "1em" }}>
                  <strong>Personal Info</strong>
                </div>
                <Divider /> <br />
                <strong>Customer Id:</strong> {customer.customerId} <br />
                <strong>Email: </strong>
                {customer.email} <br />
                <strong>Username:</strong> {customer.userName} <br />
                <strong>Phone Number:</strong> {customer.phoneNumber} <br />
                <strong>Gender:</strong> {customer.gender} <br />
                <strong>Birth Date:</strong> {customer.birthDate} <br />
                <strong>Profile Photo URL:</strong> {customer.profilePhotoUrl}{" "}
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div style={{ marginBottom: "1em" }}>
                  <strong>Account Info</strong>
                </div>
                <Divider /> <br />
                <strong>Created Date: </strong>
                {customer.createdDate}
                <br />
                <strong>Updated Date:</strong> {customer.updatedDate}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
  const [value, setValue] = React.useState("female");

  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu />

          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">My Profile</Typography>
              </Box>

              <Grid container justify="center">
                <Grid item xs={12} md={8} lg={7}>
                  <Box
                    className="back-arrow"
                    onClick={() => history.push("/profile")}
                  >
                    <img src={back} alt="back" />
                    Go back
                  </Box>
                  <Box className="primary-structure--box">
                    <Grid container justify="center" alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Typography className="m-b-30">
                          <Typography component="strong">
                            Change Password
                          </Typography>
                        </Typography>

                        <Box className="form-group">
                          <label>Current Password</label>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="password"
                          />
                        </Box>
                        <Box className="form-group">
                          <label>New Password</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
                          />
                        </Box>
                        <Box className="form-group">
                          <label>Confirm Password</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
                          />
                        </Box>

                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          className="m-t-30"
                          disableElevation
                        >
                          Change Password
                        </Button>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box className="password-instructions">
                          <Typography>
                            <Typography component="strong">
                              Password must contain:
                            </Typography>
                          </Typography>

                          <Typography>At least 1 upper case (A-Z)</Typography>
                          <Typography>At least one number (0-9)</Typography>
                          <Typography>At least 8 characters</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChangePassword;
