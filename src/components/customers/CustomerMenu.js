import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import security from "../../assets/img/security.svg";

const CustomerMenu = props => {
  return (
    <Grid item xs={12} sm={3} md={2}>
      <Box className="sidebar">
        <Box className="sidebar--header">
          <Typography component="h3">Hello, Maria!</Typography>
          <Typography>
            <img src={security} alt="security" />
            Verified Account
          </Typography>
        </Box>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<ListSubheader component="div">Account</ListSubheader>}
        >
          <ListItem button>
            <Link component={RouterLink} to="/profile">
              <ListItemText primary="My Profile" />
            </Link>
          </ListItem>
        </List>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<ListSubheader component="div">My Orders</ListSubheader>}
        >
          <ListItem button>
            <Link component={RouterLink} to="/">
              <ListItemText primary="List of orders" />
            </Link>
          </ListItem>
        </List>
      </Box>
    </Grid>
  );
};

export default CustomerMenu;
