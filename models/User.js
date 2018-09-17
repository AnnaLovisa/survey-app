const mongoose = require('mongoose');
//const Schema = mongoose.Schema; This is the same as the one below, where we use destructuring
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String  //This tells the Schema that anttime there is a value on the googleId-property, it will always be a string
});
//This is how we create a new model-class with our 'users'-collection and userSchema
//It will only create a new 'users'-collection if it doesn't already exist
mongoose.model('users', userSchema);