const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// Define user schema for different strategy
const userSchema = mongoose.Schema({
  local    : {
    email    : String,
    password : String,
  },
  facebook : {
    id       : String,
    token    : String,
    name     : String,
    email    : String,
  },
  google   : {
    id       : String,
    token    : String,
    name     : String,
    email    : String,
  },
});

// Define generate hash function
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password validation
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
