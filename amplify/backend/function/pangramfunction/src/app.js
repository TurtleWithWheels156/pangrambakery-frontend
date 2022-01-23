/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_PANGRAMBAKERY71A9BA0C_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const createStripeCheckoutSession = require('./checkout');
const createPaymentIntent = require('./payments');
//const webhooks = require('./webhooks');
const cors = require('cors');

const aws = require('aws-sdk');
var express = require('express')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(
  express.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
  })
);
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use( cors({ origin: true }));

const getStripeKey = async () => {
  const { Parameters } = await (new aws.SSM())
    .getParameters({
      Names: ['stripe_key'].map(secretName => process.env[secretName]),
      WithDecryption: true
    })
    .promise()
  return Parameters[0].Value
}

/*export const stripe = async () => {
  const stripeKey = await getStripeKey()
  return require('stripe')(stripeKey)
}*///don't use

/*export const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-08-27',
});*/

//moved because was missing references/configs
//most likely not working because no access to express json config

/**
 * Catch async errors when awaiting promises 
 * if error occurs, catch error and sends error response from endpoint
 * can wrap this around any endpoint callback that we may need
 * req: body from client
 * res: body to send back
 * next: pass control to next matching route
 */
 function runAsync(callback) {
  return (req, res, next) => {
    // if req to stripe comes back with error (express usually doesn't catch this, and api hangs till timeout (limbo issue))
    callback(req, res, next).catch(next);
  };
}

//api endpoint that can create checkout session
/**
 * Checkouts
 */
app.post(
  '/checkouts',
  //async callback to handle req and resp
  runAsync(async ({ body }, res) => {
    const stripeKey = await getStripeKey()
    const stripe = require('stripe')(stripeKey)
    //await to receive body information then execute code 
    console.log(body);
    res.send(await createStripeCheckoutSession(stripe, body.line_items, body.mode));
  })
);

/**
 * Payment Intents
 */

app.post(
  '/payments',
  runAsync(async ({ body }, res) => {
    const stripeKey = await getStripeKey()
    const stripe = require('stripe')(stripeKey)
    res.send(
      await createPaymentIntent(stripe, body.amount)
    );
  })
);

//app.post('/hooks', runAsync(webhooks.handleStripeWebhook));

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
