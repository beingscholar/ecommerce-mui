import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Switch
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
  IconButton
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
import CustomerMenu from "./CustomerMenu";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/customers";

const CustomerForm = () => {
  const [user_id, setUser_id] = useState("");
  const [customer, setCustomer] = useState();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [birthDate, setBirthDate] = useState("2017-05-24");

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        setUser_id(user.attributes.sub);
        fetch(url + "/" + user.attributes.sub)
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

  console.log("Customer: ", customer);
  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu />

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
                <ValidatorForm onSubmit={e => console.log("Form Submitted!")}>
                  <Grid container>
                    <Grid item xs={12} sm={3} md={2}>
                      <Box className="profile-image-box">
                        <Box className="position-relative">
                          <img src={user} className="user-image" alt="user" />
                          <label>
                            <input type="file" />
                            <img src={camera} alt="camera" />
                            Change Photo
                          </label>
                        </Box>
                        <Typography>
                          <img src={security} alt="security" />
                          Verified Account
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>First Name</label>

                            <TextValidator
                              autoFocus
                              required
                              autoComplete="fname"
                              variant="outlined"
                              id="given_name"
                              key="given_name"
                              name="given_name"
                              placeholder="First Name"
                              value={givenName}
                              onChange={e => {
                                setGivenName(e.target.value);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Last Name</label>
                            <TextValidator
                              autoComplete="lname"
                              required
                              variant="outlined"
                              placeholder="Family Name"
                              id="family_name"
                              key="family_name"
                              name="family_name"
                              onChange={e => {
                                setFamilyName(e.target.value);
                              }}
                              value={familyName}
                              type="text"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Birthday</label>
                            <TextValidator
                              id="date"
                              fullWidth
                              variant="outlined"
                              required
                              label="Birth Date"
                              type="date"
                              value={birthDate}
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                              onChange={e => {
                                setBirthDate(e.target.value);
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Gender</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Mobile Number</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <hr />
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Address 1</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Address 2</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>City</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>State/Province/Region</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Country</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Zip Code</label>
                            <TextField
                              id="outlined-basic"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    className="m-t-30"
                    disableElevation
                  >
                    Update Profile
                  </Button>
                </ValidatorForm>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerForm;
