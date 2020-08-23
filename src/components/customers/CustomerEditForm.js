import { Box, Button, CardMedia, MenuItem } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { NotificationManager } from "react-notifications";
import { trackPromise } from "react-promise-tracker";
import camera from "../../assets/img/camera.svg";
import security from "../../assets/img/security.svg";
import userDefaultImg from "../../assets/img/user-default-image.png";
import { CUSTOMER_URL, S3_BUCKET_URL } from "../../config/apiUrl";
import CustomerMenu from "./CustomerMenu";
import { useHistory } from "react-router-dom";

const CustomerForm = () => {
  const history = useHistory();
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
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(userDefaultImg);

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
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
        history.push("/profile");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const fileSelectedHandler = event => {
    const files = event.target.files;
    if (files.length) {
      // setSelectedFile(event.target.files[0]);
      console.log(files[0].name);
      const formData = new FormData();
      formData.append("file", files[0]);
      let newURL = CUSTOMER_URL + "/upload";
      fetch(newURL, { method: "POST", body: formData })
        .then(response => {
          if (response.status === 404 || response.status === 400) {
            NotificationManager.error(
              "Error uploading image to S3 " + customer.customerId
            );
            return response.json();
          }
          setProfilePhotoUrl(S3_BUCKET_URL + "/" + files[0].name);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
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
                <Typography className="m-b-30">
                  <Typography component="strong">
                    Please update your details
                  </Typography>
                </Typography>
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
                            src={
                              profilePhotoUrl === "photoURL"
                                ? userDefaultImg
                                : profilePhotoUrl
                            }
                            className="user-image"
                            alt="user"
                          />
                          <label>
                            <input
                              name="image_upload"
                              accept="image/*"
                              type="file"
                              onChange={fileSelectedHandler}
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
