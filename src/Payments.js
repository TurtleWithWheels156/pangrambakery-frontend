import React, { useState } from 'react';
import { fetchFromAPI } from './helpers';
// import prebuilt component that handles card input
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Payments() {
  //hooks to reference stripe and stripe elements
  const stripe = useStripe();
  const elements = useElements();

  //component state
  //amount user pays
  const [amount, setAmount] = useState(0);
  //actual response from api with intent object
  const [paymentIntent, setPaymentIntent] = useState();

  // Create a payment intent on the server; click handler
  const createPaymentIntent = async (event) => {

    // Clamp amount to Stripe min/max
    const validAmount = Math.min(Math.max(amount, 50), 9999999);
    setAmount(validAmount);

    // Make the API Request
    /*const data = { line_items: [product] }
        //destructure sessionId from checkout API
        const { data: res } = await fetchFromAPI('checkouts', {
          data
        });*/
    console.log(`amount ${validAmount}`);
    const {data: pi } = await fetchFromAPI('payments', { data: {amount: validAmount }});
    setPaymentIntent(pi);
  };

  // Handle the submission of card details; pay handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    console.log(paymentIntent);

    // Confirm Card Payment
    const {
      paymentIntent: updatedPaymentIntent,
      error,
    } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error(error);
      error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <>
      <div className="well">
        <div className="form-inline">
            <input
            type="number"
            value={amount}
            disabled={paymentIntent}
            onChange={(e) => setAmount(e.target.value)}
            />
            <button
            disabled={amount <= 0}
            onClick={createPaymentIntent}
            hidden={paymentIntent}>
            Ready to Pay ${ (amount / 100).toFixed(2) }
            </button>
        </div>
      </div>


      <form onSubmit={handleSubmit}className="well">
        <CardElement />
        <button className="btn btn-success" type="submit">
          Pay
        </button>
      </form>
    </>
  );
}