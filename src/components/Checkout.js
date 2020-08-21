import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import masterCard from "../assets/img/mastercard.svg";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Button,
  Typography,
  Link,
  Grid,
  Container,
  CssBaseline,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { NotificationManager } from "react-notifications";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//icons
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import StayCurrentPortraitOutlinedIcon from "@material-ui/icons/StayCurrentPortraitOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";

//table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Auth } from "aws-amplify";
import MediaQuery from "react-responsive";
const CART_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const PRODUCT_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";
const ORDER_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/orders";

const useStyles = makeStyles((theme) => ({
  orderCard: {
    backgroundColor: "#F0F0F0",
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [addressState, setAddressState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cart_id, setCart_id] = useState("0");
  const [user_id, setUser_id] = useState("");
  const shippingFee = 20;

  //payment form
  const [state, setState] = useState({
    Cod: false,
    CreditCard: false,
    Paypal: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { Cod, CreditCard, Paypal } = state;
  const error = [Cod, CreditCard, Paypal].filter((v) => v).length !== 2;

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser_id(user.attributes.sub);
    });
    trackPromise(
      fetch(CART_API_URL + "/test")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCart(data.items);
          var cartArr = data.items;
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
        })
    );
  }, []);

  function handleSubmit(
    name,
    email,
    address,
    address2,
    city,
    state,
    zipCode,
    paymentMethod
  ) {
    var data = {
      name: name,
      email: email,
      address: address,
      address2: address2,
      country: country,
      state: state,
      zipCode: zipCode,
      city: city,
      paymentMethod: paymentMethod,
      cart_id: cart_id,
      user_id: "test", // TODO: use actual user_id
    };
    fetch(ORDER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          NotificationManager.error(
            "Error creating order. Please ensure all fields are correct."
          );
          return response.json();
        }
        NotificationManager.success("Successfully created order.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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
                <Typography className="font-bold">
                  {product.productName}
                </Typography>
                <Typography className="font-medium">
                  {product.productDescription}
                </Typography>
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
      // <TableContainer component={Paper}>
      //   <Table className={classes.table} aria-label="simple table">
      //     <TableHead>
      //       <TableRow>
      //         <TableCell>Product</TableCell>

      //         <TableCell
      //           align="right"
      //           style={{
      //             textAlign: "center",
      //           }}
      //         >
      //           Quantity
      //         </TableCell>

      //         <TableCell
      //           align="right"
      //           style={{
      //             textAlign: "center",
      //           }}
      //         >
      //           Price
      //         </TableCell>
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       {products.map((product) => (
      //         <TableRow key={product.productId}>
      //           <TableCell component="th" scope="row">
      //             <Grid
      //               container
      //               direction="row"
      //               alignItems="center"
      //               spacing={2}
      //             >
      //               <Grid item md={6}>
      //                 <CardMedia
      //                   className={classes.cardMedia}
      //                   image={
      //                     product.imageUrl
      //                   } /* change to product.imageUrl */
      //                   title="Image title"
      //                   style={{ height: "120px" }}
      //                 />
      //               </Grid>
      //               <Grid item md={6}>
      //                 <h3>{product.productName}</h3>
      //                 <p>{product.productDescription}</p>
      //               </Grid>
      //             </Grid>
      //           </TableCell>
      //           <TableCell>
      //             <Grid
      //               container
      //               direction="column"
      //               alignItems="center"
      //               spacing={1}
      //             >
      //               <Grid item md={6}>
      //                 {product.quantity}
      //               </Grid>
      //               <Grid item md={6}>
      //                 <Link to="">Remove</Link>
      //               </Grid>
      //             </Grid>
      //           </TableCell>

      //           <TableCell align="right">
      //             <Grid
      //               container
      //               direction="column"
      //               alignItems="center"
      //               spacing={1}
      //             >
      //               <Grid item>
      //                 <h3>
      //                   {product.currency} {product.price}
      //                 </h3>
      //               </Grid>
      //             </Grid>
      //           </TableCell>
      //         </TableRow>
      //       ))}
      //     </TableBody>
      //   </Table>
      // </TableContainer>
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
      subTotal = subTotal + parseInt(product.price);
    });

    return subTotal;
  };

  return (
    <div>
      <Box className="primary-structure">
        <Container maxWidth="lg">
          <Box className="checkout-page">
            <Typography component="h4">Checkout (2) items</Typography>
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
                            Maria Dela Cruz
                          </Typography>
                          <Typography>
                            Metro Manila, Quezon City, Quezon City, Project 6
                          </Typography>
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
                          <Typography className="title">9124556770</Typography>
                        </Box>
                      </Box>
                      <Button color="primary">Edit</Button>
                    </Box>

                    <Box className="shipping-info--row">
                      <Box className="wrap">
                        <MailOutlinedIcon></MailOutlinedIcon>
                        <Box className="shipping-info--content">
                          <Typography className="title">
                            mariadelacruz@mail.com
                          </Typography>
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
                          Subtotal ({quantity(products)} items)
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
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="primary-structure--box">
                  <Typography className="font-bold">Payment Options</Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={deliveryHandleChange}
                    >
                      <FormControlLabel
                        value="cc"
                        control={<Radio color="primary" />}
                        label="Credit Card/Debit Card"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="paypal"
                        control={<Radio color="primary" />}
                        label="Paypal"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Box className="form-group m-b-20">
                    <label>Card Number*</label>
                    <Box className="input-with-icon">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="xxxx - xxxx - xxxx"
                      />
                      <img src={masterCard} width="20" alt="Card" />
                      {/* <img src={visa} width="30" alt="Card" />
                        <img src={paypal} width="15" alt="Card" /> */}
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box className="form-group">
                        <label>Expiry Date*</label>
                        <TextField id="outlined-basic" variant="outlined" />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="form-group">
                        <label>Security Code*</label>
                        <TextField id="outlined-basic" variant="outlined" />
                      </Box>
                    </Grid>
                  </Grid>
                  <Button
                    className="m-t-20"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                  >
                    Place Order
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
