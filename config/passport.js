const LocalStrategy = require('passport-local').Strategy;
const User          = require('../app/models/user');

module.exports = function(passport) {
  // Set user id to passport session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Get user based on user id in passport session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy(
    {
      usernameField     : 'email',
      passwordField     : 'password',
      passReqToCallback : true,
    },
    function(req, email, password, done) {
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, req.flash('message', 'No user found.'));
        if (!user.validPassword(password)) return done(null, false, req.flash('message', 'Oops! Wrong password.'));
        return done(null, user);
      });
    },
  ));

  passport.use('local-signup', new LocalStrategy(
    // Override field of authentication
    {
      usernameField     : 'email', // default is 'username'
      passwordField     : 'password',
      passReqToCallback : true,
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({ 'local.email' : email }, function(err, user) {
          // Throw err if exist
          if (err) return done(err);

          // Throw message if email has been taken
          if (user) return done(null, false, req.flash('message', 'That email is already taken.'));

          // Create new user if booth if-conditions passed
          const newUser          = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      });
    },
  ));
};
