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
import CustomerMenu from "./CustomerMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextValidator-root": {
      margin: theme.spacing(2),
      flexGrow: 1,
    },
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));

const CustomerForm = ({
  label,
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
  handleSubmit,
  handleClose,
}) => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
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
                    <Grid container className="edit-user-form">
                      <Grid item xs={12} sm={6}>
                        <Box className="form-group">
                          <label>First Name</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box className="form-group">
                          <label>Last Name</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box className="form-group">
                          <label>Birthday</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
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
                    <Grid container className="edit-user-form">
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

                      <Grid item xs={12} sm={5} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          className="m-t-10"
                          disableElevation
                        >
                          Update Profile
                        </Button>
                      </Grid>
                    </Grid>
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

export default CustomerForm;
