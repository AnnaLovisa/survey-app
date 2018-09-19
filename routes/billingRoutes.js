const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Login = require('../middlewares/requireLogin');

module.exports = app => {
  //requireLogin here to specify that we want this particularly route to run the middleware to require an authenticated user before the actual request-logic runs
  app.post('/api/stripe', requireLogin, async (req, res) => {

    //To check whether a user is logged in before allowing a credit charge
    //If passport did not find a user inside the cookig inside the request, end the request and send back an error-message (401 means unauthorized)
    //So we set the status of the response
    if(!req.user) {
      return res.status(401).send({ error: 'You must log in!' })
    }
    //To create a credit-card to make a request to the stripe api to finalize a transaction
    const charge = await stripe.charges.create({
      amount: 500, //The amount of money we want to build
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id  //The id of the token of authorization
    });
    //We take the model representing whoever made this request (the user-model), add 5 credits to them and send the user-model back to the client.
    //So we will respond to the request with the newly updated model
    //req.user is set up automatically by passport
    //We modify the user-model but we have to save it afterwards for it to actually be saved into the database
    req.user.credits += 5;
    const user = await req.user.save();
    //To send back the user to the client
    res.send(user);
  });
};