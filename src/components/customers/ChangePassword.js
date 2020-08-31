import { Box, Button, ButtonGroup } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router-dom";
import CustomerMenu from "./CustomerMenu";

const ChangePassword = () => {
  const history = useHistory();

  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu />

          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">My Profile</Typography>
              </Box>

              <Grid container justify="center">
                <Grid item xs={12} md={8} lg={7}>
                  {/* <Box
                    className="back-arrow"
                    onClick={() => history.push("/profile")}
                  >
                    <img src={back} alt="back" />
                    Go back
                  </Box> */}
                  <Box className="primary-structure--box">
                    <Grid container justify="center" alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Typography className="m-b-30">
                          <Typography component="strong">
                            Change Password
                          </Typography>
                        </Typography>

                        <Box className="form-group">
                          <label>Current Password</label>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="password"
                          />
                        </Box>
                        <Box className="form-group">
                          <label>New Password</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
                          />
                        </Box>
                        <Box className="form-group">
                          <label>Confirm Password</label>
                          <TextField
                            id="outlined-basic"
                            type="password"
                            variant="outlined"
                          />
                        </Box>

                        {/* <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          className="m-t-30"
                          disableElevation
                        >
                          Change Password
                        </Button> */}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box className="password-instructions">
                          <Typography>
                            <Typography component="strong">
                              Password must contain:
                            </Typography>
                          </Typography>

                          <Typography>At least 1 upper case (A-Z)</Typography>
                          <Typography>At least one number (0-9)</Typography>
                          <Typography>At least 8 characters</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <ButtonGroup>
                          <Grid container justify="space-between">
                            <Button
                              variant="contained"
                              color="primary"
                              className="m-t-30"
                              disableElevation
                              fullWidth
                              onClick={() => {}}
                            >
                              Change Password
                            </Button>
                            <Button
                              variant="outlined"
                              color="primary"
                              disableElevation
                              className="m-t-30"
                              fullWidth
                              onClick={() => history.push("/profile")}
                            >
                              Go Back
                            </Button>
                          </Grid>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChangePassword;
