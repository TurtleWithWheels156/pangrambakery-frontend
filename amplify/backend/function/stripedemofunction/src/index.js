
//init stripe
import Stripe from 'stripe'
// Stripe key env variables
import { config } from "dotenv"

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

if (process.env.NODE_ENV !== 'production') {
  // use whatever env variables in docker container or server
  config();
  console.log('loaded prod env variables');
}

//init express; braces for app because it was exported
/*import { app } from './api';
const port = process.env.PORT || 3333;
//backtick for string templatings
app.listen(port, () => console.log(`Api available on port ${port}`));*/