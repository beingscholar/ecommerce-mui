import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import check from "../../assets/img/check.png";
import { Link } from "@material-ui/core";

export default function CheckEmail() {
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <section className="user-structure">
      <div className="wrapper">
        <div className="user-structure--box">
          <img src={check} alt="Check" />
          <h3 className="m-0">Confirmation email sent! </h3>
          <p>
            Please check confirmation sent to your email and enter the code sent
            to your email.
          </p>
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
              label="Code"
              variant="outlined"
              placeholder="Please enter your code..."
              required
            />
          </div>
          <Button variant="contained" color="primary" disableElevation>
            Confirm Email
          </Button>

          <p className="m-t-15">
            Didn’t receive the email?{" "}
            <span>
              click <Link to="/">here</Link> to resend
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
