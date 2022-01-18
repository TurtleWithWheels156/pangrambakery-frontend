import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/*import { Checkout, CheckoutSuccess, CheckoutFail } from './Checkout';
import Payments from './Payments';
import Customers from './Customers';
import Subscriptions from './Subscriptions';
*/

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            </ul>
            {/*
            <li>
              <Link to="/checkout">
                <span aria-label="emoji" role="img">
                  🛒
                </span>{' '}
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/payments">
                <span aria-label="emoji" role="img">
                  💸
                </span>{' '}
                Payments
              </Link>
            </li>
            <li>
              <Link to="/customers">
                <span aria-label="emoji" role="img">
                  🧑🏿‍🤝‍🧑🏻
                </span>{' '}
                Customers
              </Link>
            </li>
            <li>
              <Link to="/subscriptions">
                <span aria-label="emoji" role="img">
                  🔄
                </span>{' '}
                Subscriptions
              </Link>
            </li>
          </ul>*/}
        </nav>

        <main>
          {<Routes>
            <Route path="/" element={<Home/>}/>
            {/*<Route path="/checkout" element={<Checkout/>}/>
            <Route path="/payments" element={<Payments/>}/>
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/subscriptions" element={<Subscriptions/>}/>
            <Route path="/sucess" element={<Sucess/>}/>
          <Route path="/failed" element={<CheckoutFail/>}/>*/}
          </Routes>}
        </main>
      </div>
    </Router>
  );
}

//switch to organize routes. each route will have route that will point to each of the links

function Home() {
  return (
    <>
      <h2>Stripe React + Node.js</h2>
      <p> yo</p>
    </>
  );
}

export default App;