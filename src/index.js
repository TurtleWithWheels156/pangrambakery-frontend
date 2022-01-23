import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

export const stripePromise = loadStripe(
  'pk_test_51KHcxzGkESe8kP2M0wTCXE6svy0BZHKhVrzwdoMEmatmeuiN6ZEHAwwLScQVeFeWFPvH0UVRIOdeLfN5UXUTcdMT00lMn1AYhj'
);
//notes
// can scope down element tree if you want elements to only be available on a payment page. which I might do.

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
        <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);