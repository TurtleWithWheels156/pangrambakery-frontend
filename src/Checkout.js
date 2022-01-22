

import React, { useState } from 'react'; //useState to manage state of application
import { fetchFromAPI } from './helpers';
import { useStripe } from '@stripe/react-stripe-js'; 
// hook from stripe library to directly use stripe sdk in component
// easy to access stripe in component

// main checkout page/ shopping cart
export function Checkout() {
    const stripe = useStripe();
    const [product, setProduct] = useState({
        name: 'Shokupan',
        description: 'Milk Bread Cube. Perfect for sandos and french toast.',
        images: [
            'https://www.atelierlalune.com/wp-content/uploads/2020/02/shokupan11-1024x685.jpg'
        ],
        amount: 799,
        currency: 'usd',
        quantity: 0,
    });

    //takes product object and calculates next quantity based on current value
    const changeQuantity = (v) =>
    setProduct({ ...product, quantity: Math.max(0, product.quantity + v) });

    const handleClick = async (event) => {
        const data = { line_items: [product] }
        //destructure sessionId from checkout API
        const { data: res } = await fetchFromAPI('checkouts', {
          data
        });

        console.log(`${JSON.stringify(res.id)}` );
    
        const { error } = await stripe.redirectToCheckout({
            sessionId: res.id
        });
    
        if (error) {
          console.log(error);
        }
      };

    return (
        <>
            <h2>Stripe Checkout</h2>
            <p>
                Shopping-cart scenario. Change the quantity
                of the products below, then click checkout to open the Stripe Checkout
                window.
            </p>
            <div className="product">
                <h3>{product.name}</h3>
                <h4>Stripe Amount: {product.amount}</h4>

                <img src={product.images[0]} width="250px" alt="product" />

                <button
                onClick={() => changeQuantity(-1)}>
                -
                </button>
                <span>
                {product.quantity}
                </span>
                <button
                onClick={() => changeQuantity(1)}>
                +
                </button>
            </div>

            <hr />

            <button
                onClick={handleClick} //event handler async function to make request to api
                disabled={product.quantity < 1}>
                Start Checkout
            </button>
    </>
    ); 
}

export function CheckoutFail() {
    return <h3> Checkout Failed! </h3>
}

//SessionId and url parameters returned when checkout was success
//May need this info when user is redirected (later retrieve via stripe api)
export function CheckoutSuccess() {
    const url = window.location.href;
    const sessionId = new URL(url).searchParams.get('session_id');
    return <h3> Checkout was a Success! {sessionId}</h3>
}