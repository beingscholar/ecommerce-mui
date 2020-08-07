import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Box component="div" className="cart-header-action">
          <Grid container>
            <Grid item xs={12} lg={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChangehead}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Seletc All (2 Items(s))"
              />
              <Button>
                <DeleteOutlineIcon />
                Delete All
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={12} lg={9}>
            <Box component="div" className="primary-box cart-product-card">
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Box className="product-box">
                <CardMedia title="Image title" />
                <CardContent>
                  <Box className="product-info-content">
                    <Typography component="h3">iphone SE 2020</Typography>
                    <Typography>Lorem ipsum is simple dummy text.</Typography>
                    <Typography component="h4">By Tech 101</Typography>
                  </Box>
                  <Box className="product-box-action">
                    <Typography component="h5">Php 25,000</Typography>
                    <Box component="div" className="icon-group">
                      <FavoriteBorderOutlinedIcon />
                      <DeleteOutlineIcon />
                    </Box>
                  </Box>
                  <Box component="div" className="quantity">
                    Quantity
                  </Box>
                </CardContent>
              </Box>
            </Box>

            <Box component="div" className="primary-box cart-product-card">
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Box className="product-box">
                <CardMedia title="Image title" />
                <CardContent>
                  <Box className="product-info-content">
                    <Typography component="h3">iphone SE 2020</Typography>
                    <Typography>Lorem ipsum is simple dummy text.</Typography>
                    <Typography component="h4">By Tech 101</Typography>
                  </Box>
                  <Box className="product-box-action">
                    <Typography component="h5">Php 25,000</Typography>
                    <Box component="div" className="icon-group">
                      <FavoriteBorderOutlinedIcon />
                      <DeleteOutlineIcon />
                    </Box>
                  </Box>
                  <Box component="div" className="quantity">
                    Quantity
                  </Box>
                </CardContent>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box
              component="div"
              className="primary-box delivery-info-box checkout-info"
            >
              <Box className="delivey-box">
                <Typography component="h3">Location</Typography>
                <ul>
                  <li>
                    <LocationOnOutlinedIcon />
                    Metro Manila Quezon City, Quezon City, Project 6
                  </li>
                </ul>
              </Box>

              <Box className="warranty-box">
                <Typography component="h3">Order Summary</Typography>
                <ul className="order-summary">
                  <li>
                    <Typography component="span">Subtotal (2 items)</Typography>
                    <Typography component="span">50,000</Typography>
                  </li>
                  <li>
                    <Typography component="span">Shipping Fee</Typography>
                    <Typography component="span">40.00</Typography>
                  </li>
                </ul>
              </Box>

              <Typography className="order-total">
                <Typography>Total</Typography>
                <Typography component="strong">50,040</Typography>
              </Typography>

              <Button
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
