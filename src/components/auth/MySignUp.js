import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const MySignUp = () => {
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <section className="user-structure">
      <div className="wrapper">
        <p>
          Already a Member? <Link to="/signin">Login</Link> here.
        </p>
        <div className="user-structure--box">
          <h3>Create your Hetchly Account</h3>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="First Name"
              placeholder="Please enter your first name..."
              variant="outlined"
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Last Name"
              placeholder="Please enter your last name..."
              variant="outlined"
              required
            />
          </div>
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
          <Button variant="contained" color="primary" disableElevation>
            Sign up
          </Button>

          <div className="recieve-offers">
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="I want to receive exclusive offers and promotions from Hetchly."
            />
          </div>

          <p>
            By clicking SIGN UP”, I agree to Hetchly{" "}
            <Link to="/">Terms of Use</Link> and{" "}
            <Link to="/">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MySignUp;
