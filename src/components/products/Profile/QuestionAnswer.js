import { Box, Tab, Tabs } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CustomerQNA from "./CustomerQNA";

const ProductDelivery = (props) => {
  const [filteredValue, setFilteredValue] = React.useState("");
  const [tabValue, setTabValue] = React.useState(0);

  const TabPanel = (props) => {
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
    value: PropTypes.any.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box component="div" className="content-box">
      <Box component="div" className="content-box--header">
        <Typography component="h3">
          <span>Displaying Questions 1-2 of 2</span>
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

          <List component="ul" className="filter-by">
            <ListItem>
              <ListItemText primary="Filter By:" />
            </ListItem>
            <ListItem>
              <FormControl className="width-auto">
                <Select
                  value={filteredValue}
                  onChange={(e) => setFilteredValue(e.target.value)}
                  variant="outlined"
                  displayEmpty
                  IconComponent={() => <ExpandMoreIcon />}
                >
                  <MenuItem value="">All Tags</MenuItem>
                  <MenuItem value="display">Display</MenuItem>
                  <MenuItem value="screen">Screen</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Box>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <CustomerQNA />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {"Customer Question and Answeres"}
      </TabPanel>
    </Box>
  );
};

export default ProductDelivery;
