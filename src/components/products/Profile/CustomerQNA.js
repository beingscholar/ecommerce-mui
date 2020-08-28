import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React from "react";

const CustomerQNA = props => {
  return (
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
            <Typography component="span">by Shubham on Oct 24, 2016</Typography>
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
            <Typography component="span">by Shubham on Oct 24, 2016</Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerQNA;
