//The Require-keyword belongs to common js-modules. Node.js doesn't have support for ES2015-modules.
//That's why we use require on the server-side and import on the frontend-side
//when we use React, because of easier access to it.
const express = require('express');

//Inside a single node-project, we might have several different express applications. So by calling an express-function,
//it generates a new application, that represents a running express-app. We are only going to use a single application
//The app-object below is used to set up configuration that will listen to an incoming request that are being
//routed to the express-side to the app from the node-side and route those requests on to different route-handlers.
//So all the routes are going to be associated with this app-object
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there'} );
});

//Whenever Heroku runs our app, it has the ability to inject environment variables, variables that are set in the
//underlying runtime that node is running on top of.
//If there isn't an environment that hasn't already been defined by Heroku, go ahead and assign that variable to PORT.
//Otherwise, by default assign that variable to 5000. So in our development-environment, we use 5000, and in
//production, we use whatever port Heroku is tempting to provide to us.
const PORT = process.env.PORT || 5000;

//localhost:5000
//This line instructs Express to tell Node that it wants to listen to incoming traffic on port 5000.
app.listen(PORT);