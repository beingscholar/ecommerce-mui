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
import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  IconButton,
  CardMedia,
  MenuItem
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

import { CUSTOMER_URL } from "../../config/apiUrl";

const CustomerForm = () => {
  const [user_id, setUser_id] = useState("");
  const [customer, setCustomer] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Female");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  const handleChange = e => {
    if (e.target.files.length) {
      setProfilePhotoUrl(URL.createObjectURL(e.target.files[0]));
      /* setProfilePhotoUrl({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      }); */
    }
  };

  /* const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  }; */

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        setUser_id(user.attributes.sub);
        fetch(CUSTOMER_URL + "/" + user.attributes.sub)
          .then(response => {
            return response.json();
          })
          .then(data => {
            const {
              firstName,
              lastName,
              phoneNumber,
              gender,
              birthDate,
              profilePhotoUrl
            } = data.customer;
            const {
              address_1,
              address_2,
              city,
              state,
              country,
              zipcode
            } = data.customer.address;
            setFirstName(firstName);
            setLastName(lastName);
            setBirthDate(birthDate.split("T")[0]);
            setGender(gender);
            setPhoneNumber(phoneNumber);
            setProfilePhotoUrl(profilePhotoUrl);
            setAddress1(address_1);
            setAddress2(address_2);
            setCity(city);
            setRegion(state);
            setCountry(country);
            setZipCode(zipcode);
            setCustomer(data.customer);
          })
          .catch(error => {
            alert(error);
          });
      })
    );
  }, []);

  const handleSubmit = (
    firstName,
    lastName,
    birthDate,
    gender,
    phoneNumber,
    profilePhotoUrl,
    address1,
    address2,
    city,
    region,
    country,
    zipCode
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
      profilePhotoUrl: profilePhotoUrl,
      address1,
      address2,
      city,
      region,
      country,
      zipCode
    };
    let newURL = CUSTOMER_URL + "/" + customer.customerId;
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
        // refreshCustomerList();
      })
      .catch(error => {
        console.error("Error:", error);
      });
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
                <ValidatorForm
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(
                      firstName,
                      lastName,
                      birthDate,
                      gender,
                      phoneNumber,
                      profilePhotoUrl,
                      address1,
                      address2,
                      city,
                      region,
                      country,
                      zipCode
                    );
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={3} md={2}>
                      <Box className="profile-image-box">
                        <Box className="position-relative">
                          <img
                            src={profilePhotoUrl}
                            className="user-image"
                            alt="user"
                          />
                          <label>
                            <input
                              accept="image/*"
                              type="file"
                              onChange={handleChange}
                            />
                            <img src={camera} alt="camera" />
                            Change Photo
                          </label>
                        </Box>
                        <Typography>
                          <CardMedia
                            alt="security"
                            title="security"
                            image={security}
                          />
                          Verified Account
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                      <Grid container className="edit-user-form">
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
                              value={firstName}
                              onChange={e => {
                                setFirstName(e.target.value);
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
                                setLastName(e.target.value);
                              }}
                              value={lastName}
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
                              placeholder="Birth Date"
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
                            <TextValidator
                              id="standard-select-currency"
                              select
                              fullWidth
                              required
                              variant="outlined"
                              placeholder="Select Gender"
                              value={gender}
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                              onChange={e => {
                                setGender(e.target.value);
                              }}
                              // helperText="Please select gender"
                            >
                              <MenuItem key="female" value="Female">
                                Female
                              </MenuItem>
                              <MenuItem key="male" value="Male">
                                Male
                              </MenuItem>
                            </TextValidator>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Mobile Number</label>
                            <TextValidator
                              autoComplete="phoneNumber"
                              variant="outlined"
                              required
                              fullWidth
                              required
                              placeholder="+63 12345678"
                              id="phoneNumber"
                              key="phoneNumber"
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={e => {
                                setPhoneNumber(e.target.value);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <hr />
                      <Grid container className="edit-user-form">
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Address 1</label>
                            <TextValidator
                              autoComplete="address1"
                              variant="outlined"
                              id="address_1"
                              key="address_1"
                              name="address_1"
                              placeholder="Address"
                              value={address1}
                              onChange={e => {
                                setAddress1(e.target.value);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Address 2</label>
                            <TextValidator
                              autoComplete="address1"
                              variant="outlined"
                              id="address_2"
                              key="address_2"
                              name="address_2"
                              value={address2}
                              onChange={e => {
                                setAddress2(e.target.value);
                              }}
                              type="text"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>City</label>
                            <TextValidator
                              autoComplete="city"
                              variant="outlined"
                              id="city"
                              key="city"
                              name="city"
                              placeholder="City"
                              value={city}
                              onChange={e => {
                                setCity(e.target.value);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>State/Province/Region</label>
                            <TextValidator
                              autoComplete="region"
                              variant="outlined"
                              id="region"
                              key="region"
                              name="region"
                              placeholder="Region"
                              value={region}
                              onChange={e => {
                                setRegion(e.target.value);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Country</label>
                            <TextValidator
                              autoComplete="country"
                              variant="outlined"
                              id="country"
                              key="country"
                              name="country"
                              placeholder="Country"
                              value={country}
                              onChange={e => {
                                setCountry(e.target.value);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Zip Code</label>
                            <TextValidator
                              autoComplete="zipCode"
                              variant="outlined"
                              id="zipCode"
                              key="zipCode"
                              name="zipCode"
                              placeholder="Zipcode"
                              value={zipCode}
                              onChange={e => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 6);
                                setZipCode(e.target.value);
                              }}
                              type="number"
                              min="6"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={5} md={4}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="m-t-10"
                            disableElevation
                            type="submit"
                          >
                            Update Profile
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
