import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={
          500
        } /* amount je u centima, default valuta je USD, ovdje stavljamo 5 dolara da trazimo od usera */
        token={(token) => {
          console.log(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      />
    );
  }
}

export default Payments;
