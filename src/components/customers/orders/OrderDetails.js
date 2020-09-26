import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Typography
} from "@material-ui/core";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
//icons
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import StayCurrentPortraitOutlinedIcon from "@material-ui/icons/StayCurrentPortraitOutlined";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import MediaQuery from "react-responsive";
import { useHistory, useParams } from "react-router-dom";
import {
  CART_API_URL,
  CUSTOMER_URL,
  ORDER_API_URL,
  PRODUCT_API_URL
} from "../../../config/apiUrl";
import CustomerMenu from "../CustomerMenu";

const OrderDetails = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState("");
  const [order, setOrder] = useState();
  const { id } = useParams();
  const history = useHistory();

  const [cardNumberError, setCardNumberError] = React.useState("");
  const [expiryDateError, setExpiryDateError] = React.useState("");
  const shippingFee = 0;

  const handleSubmit = event => {
    event.preventDefault();
  };

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        setUser(user.attributes.sub);

        fetch(ORDER_API_URL + "/" + id)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setOrder(data.order);

            fetch(CUSTOMER_URL + "/" + data.order.user_id)
              .then(response => {
                return response.json();
              })
              .then(data => {
                setCustomer(data.customer);
              })
              .catch(error => {
                alert(error);
              });

            fetch(CART_API_URL + "/" + data.order.cart_id)
              .then(response => {
                return response.json();
              })
              .then(data => {
                setCart(data.items);
                var cartArr = data.items;
                console.log(cartArr);
                var promises = [];
                cartArr.forEach(async function (item) {
                  var promise = await fetch(
                    PRODUCT_API_URL + "/" + item.product_id
                  )
                    .then(response => {
                      return response.json();
                    })
                    .then(data => {
                      data.products[0].quantity = item.quantity;
                      setProducts(products => [...products, data.products[0]]);
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
          .catch(error => {
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
        {products.map(product => {
          const imgIndex = product.baseImage && product.baseImage.split("-")[1];
          const baseImageURL = imgIndex
            ? product.imageUrls[imgIndex]
            : product.imageUrl;
          return (
            <Card key={product.productId} className="product-table--row">
              <CardMedia
                image={baseImageURL} /* change to product.imageUrl */
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
                  {/* <Link>Remove</Link> */}
                </Box>
                <Box className="product-price">
                  <Typography>
                    {product.currency} {product.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  }
  const [value, setValue] = React.useState("female");

  const deliveryHandleChange = event => {
    setValue(event.target.value);
  };

  const numberWithCommas = x => {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const quantity = products => {
    let total = 0;
    products.forEach(function (product) {
      total = total + parseInt(product.quantity);
    });
    return total;
  };

  const subTotal = products => {
    let subTotal = 0;
    products.forEach(function (product, i) {
      subTotal = subTotal + parseInt(product.price) * product.quantity;
    });

    return subTotal;
  };

  const { firstName, lastName, email, phoneNumber } = customer || "";

  const { address_1, address_2, city, state, country, zipcode } =
    customer.address || "";

  console.log("address_1: ", !Object.keys(customer).length);
  const customer_address =
    !Object.keys(customer).length || address_1 === undefined
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

  let renderOrderDetails = (
    <Box className="checkout-page">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box className="primary-structure--box">
            <Typography className="font-bold">Shipping Details</Typography>

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
              </Box>

              <Box className="shipping-info--row">
                <Box className="wrap">
                  <StayCurrentPortraitOutlinedIcon></StayCurrentPortraitOutlinedIcon>
                  <Box className="shipping-info--content">
                    <Typography className="title">{phoneNumber}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="shipping-info--row">
                <Box className="wrap">
                  <MailOutlinedIcon></MailOutlinedIcon>
                  <Box className="shipping-info--content">
                    <Typography className="title">{email}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="review-order">
              <Typography className="font-bold">Review Order</Typography>
              {productsList}
            </Box>
            <Box className="standard-delivery-info">
              <DirectionsBikeOutlinedIcon></DirectionsBikeOutlinedIcon>
              <Typography>
                <strong>Standard Delivery:</strong> Estimated date of arrival
                2-5 July
              </Typography>
            </Box>

            <Box className="order-summary">
              <Typography className="font-bold">Order Summary</Typography>
              <ul>
                <li>
                  <Typography>Subtotal ({products.length} items)</Typography>
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
                        numberWithCommas(subTotal(products) + shippingFee)}
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
          <Grid item xs={12} lg={12}>
            <ButtonGroup>
              <Grid container justify="center">
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  className="m-t-30"
                  // fullWidth
                  onClick={() => history.push("/orders-list")}
                >
                  Back to Order List
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="m-t-30"
                  disableElevation
                  // fullWidth
                  onClick={() => history.push("/")}
                >
                  Continue Shopping
                </Button>
              </Grid>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="primary-structure--box">
            <Typography className="font-bold">Payment Method</Typography>
            <FormControl component="fieldset">
              <FormControlLabel
                value="card"
                control={<Checkbox color="primary" checked />}
                label={order && order.paymentMethod}
                // labelPlacement="start"
              />
            </FormControl>
            {/* <Box className="form-group m-b-20">
              <label>Card Number</label>
              <Box className="">
                xxxx - xxxx - xxxx - 4102{" "}
                <img src={masterCard} width="20" alt="Card" />
              </Box>
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu customerName={"Mayank"} />
          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">Order Details</Typography>
              </Box>
              <Box className="primary-structure--box orders-list">
                {renderOrderDetails}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderDetails;
