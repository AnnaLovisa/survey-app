const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//One argument means we are trying to fetch something out of mongoose, two arguments means we are trying to load something into it
const User = mongoose.model('users');
//The user in this argument is exactly the user-model that we took out from the findOne()-function
//So it is a user that we retrieve from an already existing user-model, or we create a new one
//Done is a callback that we have to pass after we have done some work with passport
passport.serializeUser((user, done) => {
  //null is whenever an error occurs, as it never does, that's why it's null.
  //the user.id is a shortcut for the oid typed in mLab.
  //So we are not making use of the profile.id, but of the oid assigned to this record by mongoDB.
  //The reason is that we can't always assume that everyone have a googleID that they sign in with
  //But they all have a mongoDB-id.
  done(null, user.id);
});
//Id is the same user.id that we turned into an id in serializeUser. Now we want to turn that id into a user.
passport.deserializeUser((id, done) => {
  //We turn in the id of the user-record that we want to find
  User.findById(id).then(user => {
    done(null, user);
  });
});
//Creates a new instance of the Google passport strategy, where we pass in some configuration of how we are going to authenticate a user with Google
//The clientID and clientSecret are the ones fetched from google when we created the things in the google oauth
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'  //The route the user is going to be sent to after they grant permission
},(accessToken, refreshToken, profile, done) => {//This is the callback that appears in our node-terminal when we call the GoogleStrategy
  //The accessToken is our opportunity to create a new user to our database that has access to our app in order to make surveys
  //So with the accessToken we can identify the userinformation and save it to our database.
  //The refreshToken allows us to update the accessToken.
    //This line below will check for users that have already signed up before and whose googleId therefore would
    //be the same as the profile.id for the user who signs up
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if(existingUser) {
          //We already have a user with the given profile ID
          //Done says that everything is done and here is the existingUser
          done(null, existingUser);
        } else {
          //we don't have a user record with this ID, make a new record!
          //A new user-instance gets created anytime a user comes back from the google oauth-flow
          //Create a new user-record who has a googleId as an id that comes from the user's google-profile
          //.save() will save the record in the database
          new User({ googleId: profile.id })
            .save()
            //In the callback we get another instance
            //So we always make use of the callback instance, because it might have additional changes to it
            .then(user => done(null, user));
        }
      })
  })
);

