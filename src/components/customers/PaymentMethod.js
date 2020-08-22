import { Box, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import back from "../../assets/img/back.svg";
import masterCard from "../../assets/img/mastercard.svg";
import CustomerMenu from "./CustomerMenu";

const PaymentMethod = () => {
  const history = useHistory();
  const [paymentOption, setPaymentOption] = React.useState("card");

  const [cardNumber, setCardNumber] = React.useState("");
  const [cardDate, setCardDate] = React.useState("");
  const [cvvCode, setCVVCode] = React.useState("");

  const [cardNumberError, setCardNumberError] = React.useState("");
  const [expiryDateError, setExpiryDateError] = React.useState("");

  const handleChange = event => {
    setPaymentOption(event.target.value);
  };

  const setSecurityCode = e => {
    let cvv = e.target.value;
    const regex = /^\d+$/;
    let isValid = regex.test(cvv);
    if (cvv.length < 4 && isValid) {
      setCVVCode(cvv);
    }
  };

  const setExpiryDate = e => {
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

  const setCreditCardNumber = e => {
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

  const handleSubmit = event => {
    event.preventDefault();

    if (validateCreditCardNumber()) return false;
    if (validateExpiryData()) return false;
  };

  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu />

          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">My Profile</Typography>
              </Box>
              <Grid container justify="center">
                <Grid item xs={12} md={6} lg={5}>
                  <Box
                    className="back-arrow"
                    onClick={() => history.push("/profile")}
                  >
                    <img src={back} alt="back" />
                    Go back
                  </Box>
                  <ValidatorForm onSubmit={handleSubmit}>
                    <Box className="primary-structure--box">
                      <Typography className="m-b-30">
                        <Typography component="strong">
                          Manage Payment Method
                        </Typography>
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
                            onChange={e => {
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
                              className="card_number_error Mui-error"
                              id="card_number-helper-text"
                            >
                              {cardNumberError}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Expiry Date*</label>
                            <TextValidator
                              autoFocus
                              autoComplete="off"
                              variant="outlined"
                              id="expiry_date"
                              key="expiry_date"
                              name="expiry_date"
                              placeholder="01/2020"
                              value={cardDate}
                              onChange={e => {
                                setExpiryDate(e);
                              }}
                              type="text"
                              validators={["required"]}
                              errorMessages={["this field is required"]}
                            />
                            {expiryDateError && (
                              <Typography
                                component="p"
                                className="card_number_error Mui-error"
                                id="card_number-helper-text"
                              >
                                {expiryDateError}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box className="form-group">
                            <label>Security Code*</label>
                            <TextValidator
                              autoFocus
                              autoComplete="off"
                              variant="outlined"
                              id="security_code"
                              key="security_code"
                              name="security_code"
                              placeholder="123"
                              value={cvvCode}
                              onChange={e => {
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
                        Update
                      </Button>
                    </Box>
                  </ValidatorForm>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentMethod;
