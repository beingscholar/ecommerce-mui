import { Box, Button, ButtonGroup } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";
import React, { Fragment } from "react";

const ProductDelivery = props => {
  const [filteredValue, setFilteredValue] = React.useState("");

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} className="rating-box">
            <Fragment>
              <Typography component="h4">
                <Typography component="strong">5</Typography>
                /5
              </Typography>
              <Typography className="product-rating">
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
              </Typography>
            </Fragment>
            <Typography>38 Ratings &amp; 5 Reviews</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} className="rating-box">
            <Typography component="strong">37%</Typography>
            <Typography>Based on 3 Recommendations</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} className="rating-box transparent">
            <Typography>Would you like to recommend this item?</Typography>
            <ButtonGroup>
              <Button variant="outlined" className="default">
                Yes
              </Button>
              <Button variant="outlined" className="default">
                No
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
      </Grid>
      <Box component="div" className="content-box">
        <Box component="div" className="content-box--header">
          <Typography component="h3">
            <Typography component="span">1-5 of 5 Reviews</Typography>
            Customer Reviews
          </Typography>
          <Box component="div" className="wrap">
            <ul>
              <li>Sort By:</li>
              <li>
                <span className="active">Most Helpful</span>
              </li>
              <li>
                <span>Most Recent</span>
              </li>
            </ul>

            <ul>
              <li>Filter By:</li>
              <li>
                <FormControl className="width-auto">
                  <Select
                    value={filteredValue}
                    onChange={(e, val) => setFilteredValue(val)}
                    variant="outlined"
                    displayEmpty
                    IconComponent={() => <ExpandMoreIcon />}
                  >
                    <MenuItem value="">All Stars</MenuItem>
                  </Select>
                </FormControl>
              </li>
            </ul>
          </Box>
        </Box>
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
      </Box>
    </Fragment>
  );
};

export default ProductDelivery;
