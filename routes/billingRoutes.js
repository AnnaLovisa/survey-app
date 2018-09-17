const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) =>{
    //To create a credit-card to make a request to the stripe api to finalize a transaction
    const charge = await stripe.charges.create({
      amount: 500, //The amount of money we want to build
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id  //The id of the token of authorization
    })
  });
};