import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const ProductDelivery = props => {
  const [filteredValue, setFilteredValue] = React.useState("");

  return (
    <Box component="div" className="content-box">
      <Box component="div" className="content-box--header">
        <Typography component="h3">
          <span>Displaying Questions 1-2 of 2</span>
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
                  <MenuItem value="">All Tags</MenuItem>
                </Select>
              </FormControl>
            </li>
          </ul>
        </Box>
      </Box>
      <Box component="div" className="content-box--body">
        <Box component="div" className="que-ans-row">
          <Box component="div" className="question">
            <Avatar>Q</Avatar>
            <Typography>Is this for Iphone SE?</Typography>
          </Box>
          <Box component="div" className="answer">
            <Avatar>A</Avatar>
            <Typography>
              Yes it is
              <Typography component="span">
                by Shubham on Oct 24, 2016
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box component="div" className="que-ans-row">
          <Box component="div" className="question">
            <Avatar>Q</Avatar>
            <Typography>Is this for Iphone SE?</Typography>
          </Box>
          <Box component="div" className="answer">
            <Avatar>A</Avatar>
            <Typography>
              Yes it is
              <Typography component="span">
                by Shubham on Oct 24, 2016
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDelivery;
