const passport = require('passport');  //this is not to be confused with the passport.js in the services-directory

//Use module.exports so that the app-objects are being reached to index.js 
module.exports = app => {
  // /auth/google kicks me into the oauth-flow
  //The first argument in the routehandler below is the path that we want to handle. The second argument is some code to be
  //executed whenever a get-request comes in to this route. With the second argument, we tell express to involve passport
  //to kick the user into the authentication-flow
  //Google Strategy has some code (internal identifier) that is known as a strategy called "google", which tells passport to use
  //the google strategy.
  //Scope specifies to google servers what access we want to have inside of the users profile. Google has alternatives what we
  //can ask for from a user's account. 
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account', // adding this prompt enables account selection
    })
  );
  //A second routehandler to handle the case in which the user visits /auth/google/callback.
  //The difference with this routehandler is that the request here will have the code with it. Google Strategy will then attempt
  //to handle the request differently.
  //Here the user gets redirected to our server
  app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {       //Where the request is sent to after the passport authenticate middleware is executed.
          res.redirect('/surveys');    //Who comes into this request till be redirected to another route
        }
  );
  //To log out
  app.get('/api/logout', (req, res) => {
    //req.logout() is a function that is attached to the req-object by passport
    req.logout();
    //This is to prove to the user that they are no longer signed in
    //The response of req.user is empty (req.user no longer exists) when we log out. It is destroyed by passport.
    //res.send(req.user);
    res.redirect('/');
  });
  //The url can be defined whatever we want
  //Whenever a get request comes in
  app.get('/api/current_user', (req, res) => {
    //res.send(req.session); //req.session contains data that passport attempts to store in the cookie, before it passes it to deserializeUser, etc. Passport looks at the req.session, and not the cookie per se.
    //We immediately send the request (from our server to the browser?)
    //Someone who has gone through the oauthflow and logged in to our app can now get access to the user
    res.send(req.user);
  });
};