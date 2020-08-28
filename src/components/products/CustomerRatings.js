import { Box, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";
import React from "react";


const CustomerRatings = props => {
  return (
    <Box component="div" className="content-box--body">
      <Grid container className="review-row">
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Avatar
            alt="Remy Sharp"
            className="avtar-lg"
            src="/static/images/avatar/1.jpg"
          />
          <Typography className="verified-buyer">
            <VerifiedUserIcon />
            Verified Buyer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Typography className="product-rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Typography>
          <Typography className="review-date">
            by shubham pandey on Oct 24, 2016
          </Typography>
          <Typography className="review-desc">
            Lorem ipsum dummy text.
          </Typography>
          <Typography className="review-helpful">
            5 People Found this review helpful. Was this review helpful?
            <Button variant="outlined" className="default">
              <ThumbUpAltOutlinedIcon />5
            </Button>
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="review-row">
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Avatar
            alt="Remy Sharp"
            className="avtar-lg"
            src="/static/images/avatar/1.jpg"
          />
          <Typography className="verified-buyer">
            <VerifiedUserIcon />
            Verified Buyer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Typography className="product-rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Typography>
          <Typography className="review-date">
            by shubham pandey on Oct 24, 2016
          </Typography>
          <Typography className="review-desc">
            Lorem ipsum dummy text.
          </Typography>
          <Typography className="review-helpful">
            5 People Found this review helpful. Was this review helpful?
            <Button variant="outlined" className="default">
              <ThumbUpAltOutlinedIcon />5
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerRatings;
