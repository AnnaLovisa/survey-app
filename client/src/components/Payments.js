import React, {  Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {  connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}  /*The amount of money we want to request from the user 500 is 5 USD*/
        token={token => this.props.handleToken(token)}      /*Token is expecting to recieve a callbackfunction that will be called after we have successfully retrieved a authorization-token from the stripe-api*/ 
        stripeKey={process.env.REACT_APP_STRIPE_KEY}  /*Our publishable key*/
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);