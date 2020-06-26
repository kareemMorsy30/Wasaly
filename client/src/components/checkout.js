import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { authHeader } from './config/config';
import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/backend';

const CURRENCY = 'usd';
const PAYMENT_SERVER_URL = `${process.env.REACT_APP_BACKEND_DOMAIN}`
const fromEgyptianPoundToPiaster = amount => parseInt(amount * 100);
const successPayment = data => {
    alert('Payment Successful');
  };
  
  const errorPayment = data => {
    alert('Payment Error');
  };
  const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEgyptianPoundToPiaster(amount)
    })
    .then(successPayment)
    .catch(errorPayment);
const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
     name={name}
     description={description}
     amount={fromEgyptianPoundToPiaster(amount)}
     token={onToken(amount, description)}
     currency={CURRENCY}
     stripeKey={"pk_test_51GyFlZASd8wCD66zqqvpDkWwzbIpzeuyLZR5dF7yRhxuoPRGzYFGlf0S92QYuQG0vQXCn5nZozklF28BX8JdvGXR00DXTCsaEN"}
     zipCode
     email
     allowRememberMe
  />

export default Checkout;