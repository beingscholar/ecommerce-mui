import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
//icons
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import StayCurrentPortraitOutlinedIcon from "@material-ui/icons/StayCurrentPortraitOutlined";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { trackPromise } from "react-promise-tracker";
import MediaQuery from "react-responsive";
// import masterCard from "../assets/img/mastercard.svg";
import { CART_API_URL, CUSTOMER_URL, PRODUCT_API_URL, STRIPE_API_KEY, ORDER_API_URL } from "./../../config/apiUrl";
import { Link as RouterLink } from "react-router-dom";

import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe(STRIPE_API_KEY);

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState("");
  const [order, setOrder] = useState();


  const [cardNumberError, setCardNumberError] = React.useState("");
  const [expiryDateError, setExpiryDateError] = React.useState("");
  const shippingFee = 0;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then((user) => {
        
        setUser(user.attributes.sub)

        fetch(CUSTOMER_URL + "/" + user.attributes.sub)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCustomer(data.customer);
            
            var customer = data.customer;

            console.log(customer);

            var orderPayload = {
              name: customer.firstName + " " + customer.lastName,
              email : customer.email,
              address: customer.address.address_1,
              address2: customer.address.address_2,
              country: customer.address.country,
              state: customer.address.state,
              city: customer.address.city,
              zipCode: customer.address.zipcode,
              paymentMethod: "card",
              cart_id: user.attributes.sub,
              user_id: user.attributes.sub
            }

            setOrder(orderPayload)

          })
          .catch((error) => {
            alert(error);
          });

        fetch(CART_API_URL + "/" + user.attributes.sub)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCart(data.items);
            var cartArr = data.items;
            console.log(cartArr)
            var promises = [];
            cartArr.forEach(async function (item) {
              console.log(item.product_id);
              var promise = await fetch(PRODUCT_API_URL + "/" + item.product_id)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  data.products[0].quantity = item.quantity;
                  setProducts((products) => [...products, data.products[0]]);
                })
                .catch((error) => {
                  alert(error);
                });

              promises.push(promise);
            });
          })
          .catch((error) => {
            alert(error);
          });
      })
    );
  }, []);

  var cartData = (
    <div>
      <Grid container spacing={2}>
        <Card>
          <CardContent>
            <h1>Your shopping cart is empty</h1>

            <Button variant="contained" color="primary" href="#">
              Empty Cart
            </Button>
            <p>You may add items to your shopping cart here.</p>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
  var productsList = <div> </div>;

  if (cart) {
    productsList = (
      <Box className="product-table">
        <MediaQuery minWidth={768}>
          <Box className="product-table--head">
            <Box className="product-table--col">
              <Typography>Product</Typography>
            </Box>
            <Box className="product-table--col">
              <Typography>Quantity</Typography>
              <Typography>Price</Typography>
            </Box>
          </Box>
        </MediaQuery>
        {products.map((product) => (
          <Card key={product.productId} className="product-table--row">
            <CardMedia
              image={product.imageUrl} /* change to product.imageUrl */
              title="Image title"
            ></CardMedia>
            <CardContent>
              <Box className="product-info">
                <Typography component="h3">{product.productName}</Typography>
                <Typography>{product.productDescription}</Typography>
              </Box>

              <Box className="product-quantity">
                <Typography>
                  <Typography component="span">{product.quantity}</Typography>
                </Typography>
                <Link>Remove</Link>
              </Box>
              <Box className="product-price">
                <Typography>
                  {product.currency} {product.price}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }
  const [value, setValue] = React.useState("female");

  const deliveryHandleChange = (event) => {
    setValue(event.target.value);
  };

  const numberWithCommas = (x) => {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const quantity = (products) => {
    let total = 0;
    products.forEach(function (product) {
      total = total + parseInt(product.quantity);
    });
    return total;
  };

  const subTotal = (products) => {
    let subTotal = 0;
    products.forEach(function (product, i) {
      subTotal = subTotal + parseInt(product.price) * product.quantity;
    });

    return subTotal;
  };

  const { firstName, lastName, email, phoneNumber } = customer || "";

  const { address_1, address_2, city, state, country, zipcode } =
    customer.address || "";

  const customer_address = !Object.keys(customer).length
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
    <div>
      <Box className="primary-structure">
        <Container maxWidth="lg">
          <Box className="checkout-page">
            <Typography component="h4">Checkout ({cart.length}) items</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box className="primary-structure--box">
                  <Typography className="font-bold">
                    Shipping Details
                  </Typography>

                  <Box className="shipping-info">
                    <Box className="shipping-info--row">
                      <Box className="wrap">
                        <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                        <Box className="shipping-info--content">
                          <Typography className="title">
                            {firstName + " " + lastName}
                          </Typography>
                          <Typography>{customer_address}</Typography>
                        </Box>
                      </Box>
                      <Button color="primary">Edit</Button>
                    </Box>

                    <Box className="shipping-info--row">
                      <Box className="wrap">
                        <ReceiptOutlinedIcon></ReceiptOutlinedIcon>
                        <Box className="shipping-info--content">
                          <Typography className="title">
                            Bill to default to billing address
                          </Typography>
                        </Box>
                      </Box>
                      <Button color="primary">Edit</Button>
                    </Box>

                    <Box className="shipping-info--row">
                      <Box className="wrap">
                        <StayCurrentPortraitOutlinedIcon></StayCurrentPortraitOutlinedIcon>
                        <Box className="shipping-info--content">
                          <Typography className="title">
                            {phoneNumber}
                          </Typography>
                        </Box>
                      </Box>
                      <Button color="primary">Edit</Button>
                    </Box>

                    <Box className="shipping-info--row">
                      <Box className="wrap">
                        <MailOutlinedIcon></MailOutlinedIcon>
                        <Box className="shipping-info--content">
                          <Typography className="title">{email}</Typography>
                        </Box>
                      </Box>
                      <Button color="primary">Edit</Button>
                    </Box>
                  </Box>

                  <Box className="review-order">
                    <Typography className="font-bold">Review Order</Typography>
                    {productsList}
                  </Box>
                  <Box className="standard-delivery-info">
                    <DirectionsBikeOutlinedIcon></DirectionsBikeOutlinedIcon>
                    <Typography>
                      <strong>Standard Delivery:</strong> Estimated date of
                      arrival 2-5 July
                    </Typography>
                  </Box>

                  <Box className="order-summary">
                    <Typography className="font-bold">Order Summary</Typography>
                    <ul>
                      <li>
                        <Typography>
                          Subtotal ({products.length} items)
                        </Typography>
                        <Typography>
                          {products &&
                            products.length &&
                            products[0].currency +
                              " " +
                              numberWithCommas(subTotal(products))}
                        </Typography>
                      </li>
                      <li>
                        <Typography>Shipping Fee</Typography>
                        <Typography>
                          {products &&
                            products.length &&
                            products[0].currency +
                              " " +
                              numberWithCommas(shippingFee)}
                        </Typography>
                      </li>
                      <li>
                        <Typography component="strong">Total</Typography>
                        <Typography component="strong">
                          {products &&
                            products.length &&
                            products[0].currency +
                              " " +
                              numberWithCommas(
                                subTotal(products) + shippingFee
                              )}
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  {/* <Button
                      className="m-t-20"
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      // onClick={() => placeOrder()}
                    >
                      Place Order
                    </Button> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                  <Elements stripe={promise}>
                     <PaymentForm amount={1000} currency="usd" order={order} />                  
                   </Elements>
              </Grid> 
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Checkout;
