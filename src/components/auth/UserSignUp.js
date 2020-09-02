import React, { useState } from "react";
import { Box, Link, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import HetchlyAccount from "../../assets/img/hetchly-account.svg";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import { useUser } from "../utilities/user";

const MySignUp = () => {
  const history = useHistory();
  const { signup } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  async function handleSignUp(
    username,
    password,
    givenName,
    familyName,
    isSubscribed
  ) {
    try {
      // wait to see if login was successful (we don't care about the return
      // value here)
      await signup(username, password, givenName, familyName);
      history.push("/check-email");
    } catch (err) {
      // If an error occured, showcase the proper message (we customised the
      // message ourselves in `UserProvider`'s code)
      console.log(err);
    }
  }

  return (
    <Box className="user-page">
      <Typography>
        Already a Member?{" "}
        <Link component={RouterLink} to="/signin">
          Login
        </Link>{" "}
        here.
      </Typography>
      <Box className="user-page--wrapper">
        <Box className="user-page--info">
          <Typography component="h3">Create your Hetchly Account</Typography>
          <Box className="info">
            <Typography>
              <Typography component="strong">Manage Your Orders</Typography>
            </Typography>
            <Typography>
              Track orders, manage cancellations &amp; returns.
            </Typography>
          </Box>

          <Box className="info">
            <Typography>
              <Typography component="strong">
                Shortlist your wishlist items you love
              </Typography>
            </Typography>
            <Typography>Keep items you love on a watchlist.</Typography>
          </Box>

          <Box className="info">
            <Typography>
              <Typography component="strong">
                Awesome offers and updates for you
              </Typography>
            </Typography>
            <Typography>
              Be first to know about great offers and save.
            </Typography>
          </Box>

          <img src={HetchlyAccount} alt="Hetchly_Account" />
        </Box>
        <Box className="user-page--form">
          <ValidatorForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp(
                username,
                password,
                givenName,
                familyName,
                isSubscribed
              );
            }}
          >
            <Box className="form-group">
              <label>First Name*</label>
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
                onChange={(e) => {
                  setGivenName(e.target.value);
                }}
                type="text"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Box>
            <Box className="form-group">
              <label>Family Name*</label>
              <TextValidator
                autoComplete="lname"
                required
                variant="outlined"
                placeholder="Family Name"
                id="family_name"
                key="family_name"
                name="family_name"
                onChange={(e) => {
                  setFamilyName(e.target.value);
                }}
                value={familyName}
                type="text"
              />
            </Box>
            <Box className="form-group">
              <label>Email*</label>
              <TextValidator
                autoComplete="email"
                variant="outlined"
                fullWidth
                required
                placeholder="johndoe@mail.com"
                id="username"
                key="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "Email is not valid"]}
              />
            </Box>
            <Box className="form-group">
              <label>Password*</label>
              <TextValidator
                required
                variant="outlined"
                autoComplete="current-password"
                placeholder="Password"
                fullWidth
                id="password"
                key="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Sign up
            </Button>

            <Box className="recieve-offers">
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    name="subscribed"
                    // Subscribed={isSubscribed}
                    value={isSubscribed ? 1 : 0}
                    onChange={() => setIsSubscribed(true)}
                    color="primary"
                  />
                }
                label="I want to receive exclusive offers and promotions from Hetchly."
              />
            </Box>

            <Typography>
              By clicking "SIGN UP", I agree to Hetchly{" "}
              <Link to="/" component={RouterLink}>
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/" component={RouterLink}>
                Privacy Policy
              </Link>
            </Typography>
          </ValidatorForm>
        </Box>
      </Box>
    </Box>
  );
};

export default MySignUp;
