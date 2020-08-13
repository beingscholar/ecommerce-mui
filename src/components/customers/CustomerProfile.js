import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
} from "react-router-dom";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router";
import { trackPromise } from "react-promise-tracker";
import { NotificationManager } from "react-notifications";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import security from "../../assets/img/security.svg";
import camera from "../../assets/img/camera.svg";
import masterCard from "../../assets/img/mastercard.svg";
import visa from "../../assets/img/visa.svg";
import paypal from "../../assets/img/paypal.svg";
import user from "../../assets/img/user.jpg";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import { Auth } from "aws-amplify";
import CustomerEditForm from "./CustomerEditForm";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/customers";

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
  const [customer, setCustomer] = useState();
  const [modalStyle] = React.useState(getModalStyle);
  const [user_id, setUser_id] = useState("");
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("2017-05-24");
  const [gender, setGender] = useState("Female");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then((user) => {
        setUser_id(user.attributes.sub);
        fetch(url + "/" + user.attributes.sub)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCustomer(data.customer);
          })
          .catch((error) => {
            alert(error);
          });
      })
    );
  }, []);
  function refreshCustomerList() {
    trackPromise(
      fetch(url + "/" + user_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCustomer(data.customer);
        })
    );
  }

  const handleEdit = (customer) => {
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
      profilePhotoUrl: photoURL,
    };
    console.log(JSON.stringify(data));
    var newURL = url + "/" + customer.customerId;
    fetch(newURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
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
      .catch((error) => {
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
    handleClose,
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={3} md={2}>
            <Box className="sidebar">
              <Box className="sidebar--header">
                <Typography component="h3">Hello, Maria!</Typography>
                <Typography>
                  <img src={security} alt="security" />
                  Verified Account
                </Typography>
              </Box>

              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div">Account</ListSubheader>
                }
              >
                <ListItem button>
                  <Link component={RouterLink} to="/">
                    <ListItemText primary="My Profile" />
                  </Link>
                </ListItem>
              </List>

              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div">My Orders</ListSubheader>
                }
              >
                <ListItem button>
                  <Link component={RouterLink} to="/">
                    <ListItemText primary="List of orders" />
                  </Link>
                </ListItem>
              </List>

              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div">Account</ListSubheader>
                }
              >
                <ListItem button onClick={handleClick}>
                  <ListItemText primary="My Profile" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <Link component={RouterLink} to="/edit-profile">
                        <ListItemText primary="Edit Profile" />
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link component={RouterLink} to="/change-password">
                        <ListItemText primary="Change Password" />
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link component={RouterLink} to="/payment-method">
                        <ListItemText primary="Update Card Details" />
                      </Link>
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button>
                  <Link component={RouterLink} to="/">
                    <ListItemText primary="My Orders" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link component={RouterLink} to="/">
                    <ListItemText primary="List of orders" />
                  </Link>
                </ListItem>
              </List>

              {/* <ul>
                <li>
                  <Link className="active">Account</Link>
                </li>
                <li className="show">
                  <a className="active">
                    My Profile <ExpandLess />
                  </a>
                  <ul>
                    <li>
                      <Link component={RouterLink} to="/">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link component={RouterLink} to="/">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link component={RouterLink} to="/">
                        Update Card Details
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link component={RouterLink} to="/">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/">
                    List of orders
                  </Link>
                </li>
              </ul> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">My Profile</Typography>
                {/* <ButtonGroup>
                  <Button variant="outlined" color="primary">
                    Save Changes
                  </Button>
                  <Button variant="contained" color="primary" disableElevation>
                    Update Profile
                  </Button>
                </ButtonGroup> */}
              </Box>

              <Box className="primary-structure--box">
                <Grid container>
                  <Grid item xs={12} sm={4} md={2}>
                    <Box className="profile-image-box">
                      <img src={user} className="user-image" alt="user" />
                      <Typography>
                        <img src={security} alt="security" />
                        Verified Account
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={5}>
                    <h3>Maria Dela Cruz</h3>
                    <Typography>
                      <Typography component="strong">
                        Email Address:{" "}
                      </Typography>
                      mariadelacruz@mail.com
                    </Typography>
                    <Typography>
                      <Typography component="strong">Address: </Typography>
                      Metro Manila Quezon City, Quezon City, Project 6
                    </Typography>
                    <Typography>
                      <Typography component="strong">Gender: </Typography>
                      Female
                    </Typography>
                    <Typography>
                      <Typography component="strong">Birthday: </Typography>
                      1993-10-25
                    </Typography>
                    <Typography>
                      <Typography component="strong">
                        Mobile Number:{" "}
                      </Typography>
                      +63 *******8
                    </Typography>
                    <Typography>
                      <Typography component="strong">
                        Payment Method:{" "}
                      </Typography>
                      <Box className="wrap">
                        Mastercard
                        <img src={masterCard} width="20" alt="Card" />
                        {/* <img src={visa} width="30" alt="Card" />
                        <img src={paypal} width="15" alt="Card" /> */}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                      >
                        Edit Profile
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        fullWidth
                      >
                        Change Password
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Box>

              <Box className="primary-structure--box payment-method">
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography>Payment Methods</Typography>
                    <ul>
                      <li>Credit Card/Debit Card: </li>
                      <li>
                        5125 - xxxx - xxxx - xxxx
                        <img src={masterCard} width="20" alt="Card" />
                        {/* <img src={visa} width="30" alt="Card" />
                        <img src={paypal} width="15" alt="Card" /> */}
                      </li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                      >
                        Manage Payment Methods
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerProfile;
