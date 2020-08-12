import React, { Component } from "react";
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
  IconButton
} from "@material-ui/core";

//temp url for carts
const CART_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const PRODUCT_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: true,
      products: [],
      cart: [],
      quantity: 1
    };
  }

  componentDidMount() {
    const that = this;
    trackPromise(
      fetch(CART_API_URL + "/test")
        .then(response => {
          return response.json();
        })
        .then(data => {
          that.setState({ cart: data.items });
          var cartArr = data.items;
          var promises = [];
          cartArr.forEach(async function (product) {
            // console.log(product.product_id);
            var promise = await fetch(
              PRODUCT_API_URL + "/" + product.product_id
            )
              .then(response => {
                return response.json();
              })
              .then(data => {
                data.products[0].quantity = product.quantity;
                data.products[0].isChecked = true;
                data.products[0].netTotal =
                  parseInt(product.quantity) * parseInt(data.products[0].price);
                that.setState(prevState => ({
                  products: [...prevState.products, data.products[0]]
                }));
              })
              .catch(error => {
                alert(error);
              });

            promises.push(promise);
          });
        })
        .catch(error => {
          alert(error);
        })
    );
  }

  handleChange = e => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    this.setState(prevState => {
      let { products, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        products = products.map(product => ({
          ...product,
          isChecked: checked
        }));
      } else {
        products = products.map(product =>
          product.productName === itemName
            ? { ...product, isChecked: checked }
            : product
        );
        allChecked = products.every(product => product.isChecked);
      }
      return { products, allChecked };
    });
  };

  numberWithCommas = x => {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  renderList = () => {
    var cartData = (
      <div>
        <Grid container spacing={2}>
          <Card>
            <CardContent>
              <Typography component="h1">
                Your shopping cart is empty
              </Typography>
              <Button variant="contained" color="primary" href="#">
                Empty Cart
              </Button>
              <Typography component="p">
                You may add items to your shopping cart here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );

    if (this.state.cart) {
      cartData = this.state.products.map(product => {
        return (
          <Box
            component="div"
            className="primary-box cart-product-card"
            key={product.productId}
          >
            <Box className="product-box">
              <Box className="product-checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  key={product.productId}
                  name={product.productName}
                  value={product.productName}
                  checked={product.isChecked}
                  onChange={this.handleChange}
                />
                <CardMedia title="Image title" image={product.imageUrl} />
              </Box>
              <CardContent>
                <Box className="product-info-content">
                  <Typography component="h3">
                    <Link
                      component={RouterLink}
                      to={"/products/" + product.productId}
                    >
                      {product.productName}
                    </Link>
                  </Typography>
                  <Typography>{product.productDescription}</Typography>
                  <Typography component="h4">By {product.supplier}</Typography>
                </Box>
                <Box className="product-box-action">
                  <Typography component="h5">
                    {product.currency} {this.numberWithCommas(product.netTotal)}
                  </Typography>
                  <Box component="div" className="icon-group">
                    <FavoriteBorderOutlinedIcon />
                    <DeleteOutlineIcon />
                  </Box>
                </Box>
                <Box component="div" className="quantity">
                  <NumberField
                    onChange={e => this.setState({ quantity: e })}
                    value={product.quantity}
                    minValue={0}
                    maxValue={product.quantity}
                  />
                </Box>
              </CardContent>
            </Box>
          </Box>
        );
      });
    }

    return cartData;
  };
  render() {
    const { products, allChecked } = this.state;
    const productCount = products.length;
    const subTotalCount = products.filter(product => product.isChecked).length;

    const subtotal = products
      .filter(({ isChecked }) => isChecked === true)
      .reduce(
        (totalPrice, product) => totalPrice + parseInt(product.netTotal),
        0
      );
    console.log("subtotal: ", subtotal);

    return (
      <Box component="div" className="main-content">
        <Container maxWidth="lg">
          <Box component="div" className="cart-header-action">
            <Grid container>
              <Grid item xs={12} lg={8}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkAll"
                      color="primary"
                      checked={allChecked}
                      onChange={this.handleChange}
                    />
                  }
                  label={`Select All (${productCount} Items(s))`}
                />
                <Button>
                  <DeleteOutlineIcon />
                  Delete All
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid item xs={12} lg={8}>
              {this.renderList()}
            </Grid>

            <Grid item xs={12} lg={4}>
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
                      <Typography component="span">
                        Subtotal ({subTotalCount} items)
                      </Typography>
                      <Typography component="span">
                        {this.numberWithCommas(subtotal)}
                      </Typography>
                    </li>
                    <li>
                      <Typography component="span">Shipping Fee</Typography>
                      <Typography component="span">0.00</Typography>
                    </li>
                  </ul>
                </Box>

                <Typography className="order-total">
                  <Typography>Total</Typography>
                  <Typography component="strong">
                    {this.numberWithCommas(subtotal)}
                  </Typography>
                </Typography>

                <Button
                  component={RouterLink}
                  to="/checkout"
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
  }
}

export default Cart;
