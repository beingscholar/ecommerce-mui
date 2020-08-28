import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

const FooterTop = () => {
  return (
    <Box className="payment-info-box">
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} spacing={0}>
          <Box className="box no-border">
            <Avatar alt="Secure Payments" src="/static/images/avatar/1.jpg" />
            <Typography component="h3">100% Secure Payments</Typography>
            <Typography>
              Moving your card details to a{" "}
              <span> much more secured place.</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} spacing={0}>
          <Box className="box">
            <Avatar alt="Trustpay" src="/static/images/avatar/1.jpg" />
            <Typography component="h3">Trustpay</Typography>
            <Typography>
              100% Payment Protection. <span>Easy Return Policy</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} spacing={0}>
          <Box className="box">
            <Avatar alt="Shop on the Go" src="/static/images/avatar/1.jpg" />
            <Typography component="h3">Shop on the Go</Typography>
            <Typography>
              100% Payment Protection. <span>Easy Return Policy</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterTop;
