import { Box, Button, ButtonGroup, Tab, Tabs } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import CustomerRatings from "./CustomerRatings";

/* const RatingFilter = () => {
  const stars = [5, 4, 3, 2, 1];
  return stars.map(star => (
    <MenuItem value={star} className="product-rating" key={star}>
      <Rating name="half-rating-read" defaultValue={star} readOnly />
    </MenuItem>
  ));
}; */

const ProductDelivery = props => {
  const [filteredValue, setFilteredValue] = React.useState("");
  const [tabValue, setTabValue] = React.useState(0);

  const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        className="tab-content"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

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
            <Typography>{"38 Ratings & 5 Reviews"}</Typography>
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
            {/* <ul>
              <li>Sort By:</li>
              <li>
                <span className="active">Most Helpful</span>
              </li>
              <li>
                <span>Most Recent</span>
              </li>
            </ul> */}
            <Typography>Sort By:</Typography>
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              indicatorColor="primary"
            >
              <Tab label="Most Helpful" {...a11yProps(0)} />
              <Tab label="Most Recent" {...a11yProps(1)} />
            </Tabs>

            <ul>
              <li>Filter By:</li>
              <li>
                <FormControl className="width-auto product-rating">
                  <Select
                    value={filteredValue}
                    onChange={e => setFilteredValue(e.target.value)}
                    variant="outlined"
                    displayEmpty
                    IconComponent={() => <ExpandMoreIcon />}
                  >
                    <MenuItem value="">All Stars</MenuItem>
                    <MenuItem value={5} className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={5}
                        readOnly
                      />
                    </MenuItem>
                    <MenuItem value={4} className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={4}
                        readOnly
                      />
                    </MenuItem>
                    <MenuItem value={3} className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={3}
                        readOnly
                      />
                    </MenuItem>
                    <MenuItem value={2} className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2}
                        readOnly
                      />
                    </MenuItem>
                    <MenuItem value={1} className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={1}
                        readOnly
                      />
                    </MenuItem>
                  </Select>
                </FormControl>
              </li>
            </ul>
          </Box>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <CustomerRatings />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CustomerRatings />
        </TabPanel>
      </Box>
    </Fragment>
  );
};

export default ProductDelivery;
