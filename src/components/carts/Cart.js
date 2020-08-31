import { Box, Button, InputBase } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Auth } from "aws-amplify";
import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { Link as RouterLink } from "react-router-dom";
//temp url for carts
import {
  CART_API_URL,
  CUSTOMER_URL,
  INVENTORY_URL,
  PRODUCT_API_URL
} from "../../config/apiUrl";
import FooterTop from "../layouts/FooterTop";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: true,
      products: [],
      cart: [],
      quantity: 1,
      user_id: 0,
      customerAddress: ""
    };
  }

  componentDidMount() {
    const that = this;
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        that.setState({ user_id: user.attributes.sub });

        fetch(CUSTOMER_URL + "/" + user.attributes.sub)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ customerAddress: data.customer.address });
          })
          .catch(error => {
            alert(error);
          });

        fetch(CART_API_URL + "/" + user.attributes.sub)
          .then(response => {
            return response.json();
          })
          .then(data => {
            that.setState({ cart: data.items });
            var cartArr = data.items;
            var promises = [];
            let maxQuantity = 0;
            cartArr.forEach(async function (product) {
              // console.log(product.product_id);
              var inv = await fetch(INVENTORY_URL + "/" + product.product_id)
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  maxQuantity = data.product.quantity;
                });
              var promise = await fetch(
                PRODUCT_API_URL + "/" + product.product_id
              )
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  data.products[0].maxQuantity = maxQuantity;
                  data.products[0].quantity = product.quantity;
                  data.products[0].isChecked = true;
                  data.products[0].netTotal =
                    parseInt(product.quantity) *
                    parseInt(data.products[0].price);
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
          });
      })
    );
  }

  removeCartItem = (e, product_id) => {
    e.preventDefault();
    const that = this;
    const endPoint =
      CART_API_URL + "/" + this.state.user_id + "/products/" + product_id;
    trackPromise(
      fetch(endPoint, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          console.log("response: ", response);
          return response.json();
        })
        .then(data => {
          that.setState({ cart: data.items });
          const updateProducts = that.state.products.filter(
            product => product.productId !== product_id
          );
          that.setState({ products: updateProducts });
        })
        .catch(error => {
          alert(error);
        })
    );
  };

  emptyCart = e => {
    e.preventDefault();
    const that = this;
    const endPoint = CART_API_URL + "/" + this.state.user_id;
    trackPromise(
      fetch(endPoint, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          that.setState({ cart: [] });
        })
        .catch(error => {
          alert(error);
        })
    );
  };

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

  updateQuantity(product, index, action) {
    const endPoint = CART_API_URL + "/" + this.state.user_id;
    const products = this.state.products;
    product.quantity =
      action === "add"
        ? parseInt(product.quantity) + 1
        : parseInt(product.quantity) - 1;

    product.netTotal = parseInt(product.quantity) * parseInt(product.price);

    products.splice(index, 1, product);

    this.setState({ products });

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.productId,
        action,
        quantity: 1
      })
    };
    trackPromise(
      fetch(endPoint, requestOptions)
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.log(error);
          alert(error);
        })
    );
  }

  numberWithCommas = x => {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  renderList = () => {
    var cartData = (
      <Box component="div" className="primary-box cart-product-card">
        <Box className="product-box">
          <CardContent>
            <Box className="product-info-content">
              <Typography component="h3">
                Your shopping cart is empty
              </Typography>
            </Box>
          </CardContent>
          <CardContent>
            <Box>
              <Typography component="h4">
                You may add items to your shopping cart here.
              </Typography>
            </Box>
          </CardContent>
          <Box component="div" className="quantity">
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Box>
    );

    if (this.state.cart.length > 0) {
      cartData = this.state.products.map((product, index) => {
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
                    <DeleteOutlineIcon
                      onClick={e => this.removeCartItem(e, product.productId)}
                    />
                  </Box>
                </Box>
                <Box component="div" className="quantity">
                  <Box className="number-field">
                    <Button
                      onClick={() => this.updateQuantity(product, index, "rem")}
                      className="remove-quantity"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </Button>
                    <InputBase value={product.quantity} />
                    <Button
                      onClick={() => this.updateQuantity(product, index, "add")}
                      className="add-quantity"
                      disabled={
                        parseInt(product.quantity) >=
                        parseInt(product.maxQuantity)
                      }
                    >
                      +
                    </Button>
                  </Box>
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
    // console.log("products: ", products);
    const productCount = products.length;
    const subTotalCount = products.filter(product => product.isChecked).length;

    const subtotal = products
      .filter(({ isChecked }) => isChecked === true)
      .reduce(
        (totalPrice, product) => totalPrice + parseInt(product.netTotal),
        0
      );
    console.log();
    const {
      address_1,
      address_2,
      city,
      state,
      country,
      zipcode
    } = this.state.customerAddress;

    const customer_address = !Object.keys(this.state.customerAddress).length
      ? ""
      : address_1 +
        ", " +
        address_2 +
        ", " +
        city +
        ", " +
        state +
        ", " +
        country +
        " - " +
        zipcode;

    return (
      <Box component="div" className="main-content">
        <Container maxWidth="lg">
          {this.state.cart.length > 0 && (
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
                  <Button onClick={this.emptyCart}>
                    <DeleteOutlineIcon />
                    Delete All
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
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
                      {customer_address}
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
          <FooterTop />
        </Container>
      </Box>
    );
  }
}

export default Cart;
