import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { PAYMENT_API_URL, ORDER_API_URL, CART_API_URL } from "./../../config/apiUrl";
import { trackPromise } from "react-promise-tracker";
import { useHistory } from "react-router-dom";

const PaymentForm = ({
  amount, currency, order
}) => {

  const history = useHistory();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  // const [amount, setAmount] = useState('');
  // const [currency, setCurrency] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(PAYMENT_API_URL + "/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "paymentGateway": "stripe",
            "amount": amount,
            "currency": currency,
            "description": "sample"
        })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.payment['clientSecret']);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }  
    }
  };

 const emptyCart = () => {
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

  const placeOrder = (orderPayload) => {
    const endPoint = ORDER_API_URL;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
      };

    console.log(requestOptions)

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


  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
  
    //process the payment here

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      // if payment success, we place the order
      console.log(order)
      placeOrder(order)

      alert("Success! your order has been placed.")
      history.push("/order-confirm");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}

export default PaymentForm;
