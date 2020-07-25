import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "@material-ui/core";
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
    <section className="user-structure">
      <div className="wrapper">
        <p>
          Already a Member?{" "}
          <Link component={RouterLink} to="/signin">
            Login
          </Link>{" "}
          here.
        </p>
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
          <div className="user-structure--box">
            <h3>Create your Hetchly Account</h3>
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Sign up
            </Button>

            <div className="recieve-offers">
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    name="subscribed"
                    Subscribed={isSubscribed}
                    value={isSubscribed ? 1 : 0}
                    onChange={() => setIsSubscribed(true)}
                    color="primary"
                  />
                }
                label="I want to receive exclusive offers and promotions from Hetchly."
              />
            </div>

            <p>
              By clicking "SIGN UP", I agree to Hetchly{" "}
              <Link component={RouterLink}>Terms of Use</Link> and{" "}
              <Link component={RouterLink}>Privacy Policy</Link>
            </p>
          </div>
        </ValidatorForm>
      </div>
    </section>
  );
};

export default MySignUp;
