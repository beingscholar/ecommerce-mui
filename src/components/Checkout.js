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
import masterCard from "../assets/img/mastercard.svg";
import { CART_API_URL, CUSTOMER_URL, PRODUCT_API_URL } from "../config/apiUrl";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = React.useState("");

  const [paymentOption, setPaymentOption] = React.useState("card");

  const [cardNumber, setCardNumber] = React.useState("");
  const [cardDate, setCardDate] = React.useState("");
  const [cvvCode, setCVVCode] = React.useState("");

  const [cardNumberError, setCardNumberError] = React.useState("");
  const [expiryDateError, setExpiryDateError] = React.useState("");
  const shippingFee = 0;

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const setSecurityCode = (e) => {
    let cvv = e.target.value;
    const regex = /^\d+$/;
    let isValid = regex.test(cvv);
    if (cvv.length < 4 && isValid) {
      setCVVCode(cvv);
    }
  };

  const setExpiryDate = (e) => {
    let expDate = e.target.value;
    const regex = /^[0-9/]*$/;
    let isValid = regex.test(expDate);
    if (expDate.length < 8 && isValid) {
      if (expDate.length == 2) {
        if (e.keyCode != 8) {
          expDate = expDate + "/";
        }
      }
      setCardDate(expDate);
    }
  };

  const setCreditCardNumber = (e) => {
    setCardNumberError("");
    let ccNum = e.target.value;
    const regex = /^[0-9-]*$/;
    let isValid = regex.test(ccNum);
    if (ccNum.length < 20 && isValid) {
      if (ccNum.length == 4 || ccNum.length == 9 || ccNum.length == 14) {
        if (e.keyCode != 8) {
          ccNum = ccNum + "-";
        }
      }
      setCardNumber(ccNum);
    }
  };

  const validateCreditCardNumber = () => {
    let ccNum = cardNumber.replace(/-/g, "");
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      isValid = true;
    }
    if (isValid) {
      return true;
    } else {
      setCardNumberError(["Please provide a valid Visa number!"]);
      return false;
    }
  };

  const validateExpiryData = () => {
    var today, newDay;
    let cardMY = cardDate.split("/");
    var exMonth = cardMY[0];
    var exYear = cardMY[1];
    today = new Date();
    newDay = new Date();
    newDay.setFullYear(exYear, exMonth, 1);
    if (newDay < today) {
      setExpiryDateError("Invalid expiry date");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateCreditCardNumber()) return false;
    if (validateExpiryData()) return false;
  };

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then((user) => {
        fetch(CUSTOMER_URL + "/" + user.attributes.sub)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCustomer(data.customer);
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
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <ValidatorForm onSubmit={handleSubmit}>
                  <Box className="primary-structure--box">
                    <Typography className="font-bold">
                      Payment Options
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="gender"
                        name="payment_methods"
                        value={paymentOption}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio color="primary" />}
                          label="Credit Card/Debit Card"
                          // labelPlacement="start"
                        />
                        <FormControlLabel
                          value="paypal"
                          control={<Radio color="primary" />}
                          label="Paypal"
                          // labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box className="form-group m-b-20">
                      <label>Card Number*</label>
                      <Box className="input-with-icon">
                        <TextValidator
                          autoFocus
                          autoComplete="off"
                          variant="outlined"
                          id="card_number"
                          key="card_number"
                          name="card_number"
                          placeholder="xxxx - xxxx - xxxx"
                          value={cardNumber}
                          onChange={(e) => {
                            setCreditCardNumber(e);
                          }}
                          type="text"
                          validators={["required"]}
                          errorMessages={["this field is required"]}
                        />
                        <img src={masterCard} width="20" alt="Card" />
                        {/* <img src={visa} width="30" alt="Card" />
                        <img src={paypal} width="15" alt="Card" /> */}
                        {cardNumberError && (
                          <Typography
                            component="p"
                            className="custom-error"
                            id="card_number-helper-text"
                          >
                            {cardNumberError}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <label>Expiry Date*</label>
                          <TextValidator
                            autoComplete="off"
                            variant="outlined"
                            id="expiry_date"
                            key="expiry_date"
                            name="expiry_date"
                            placeholder="01/2020"
                            value={cardDate}
                            onChange={(e) => {
                              setExpiryDate(e);
                            }}
                            type="text"
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                          />
                          {expiryDateError && (
                            <Typography
                              component="p"
                              className="custom-error"
                              id="card_number-helper-text"
                            >
                              {expiryDateError}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <label>Security Code*</label>
                          <TextValidator
                            autoComplete="off"
                            variant="outlined"
                            id="security_code"
                            key="security_code"
                            name="security_code"
                            placeholder="123"
                            value={cvvCode}
                            onChange={(e) => {
                              setSecurityCode(e);
                            }}
                            type="text"
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Button
                      className="m-t-20"
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      type="submit"
                    >
                      Place Order
                    </Button>
                  </Box>
                </ValidatorForm>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Checkout;
