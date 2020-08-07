import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link as RouterLink } from "react-router-dom";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import NumberField from "../ui/NumberField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";
import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  IconButton,
} from "@material-ui/core";

//temp url for carts
// const CART_API_URL =
//   "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
// const PRODUCT_API_URL =
//   "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "2em 1em",
  },
  cover: {
    width: 151,
  },
  content: {
    flex: "1 0 auto",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Cart = () => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const handleChangehead = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Box className="sub-header">
        <Container maxWidth="lg">About Us</Container>
      </Box>
      <Box component="div" className="main-content content-pages">
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit">Home</Link>
            <Typography color="textPrimary">About Us</Typography>
          </Breadcrumbs>

          <Typography component="h1">
            Snap Photos and share like never before
          </Typography>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
