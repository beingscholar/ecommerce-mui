import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";

const MySignIn = () => {
  return (
    <section className="user-structure">
      <div className="wrapper">
        <p>
          New Member? <Link to="/signup">Register</Link> here.
        </p>
        <div className="user-structure--box">
          <h3>Welcome to Hetchly! Please Join.</h3>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Email"
              placeholder="Please enter your email..."
              variant="outlined"
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              placeholder="Please enter your password..."
              type="password"
              required
            />
          </div>
          <div className="form-link">
            <Link to="/">Forgot Password?</Link>
          </div>
          <Button variant="contained" color="primary" disableElevation>
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MySignIn;
