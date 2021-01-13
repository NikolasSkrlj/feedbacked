import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={
          500
        } /* amount je u centima, default valuta je USD, ovdje stavljamo 5 dolara da trazimo od usera */
        token={(token) => {
          this.props.handleToken(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        description="$5 for 5 email credits"
        name="Feedbacked."
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
