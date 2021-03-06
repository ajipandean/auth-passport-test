module.exports = function(app, passport) {
  // Homepage
  app.get('/', function(req, res) {
    res.render('index.pug');
  });

  // Login page
  app.get('/login', function(req, res) {
    res.render('login.pug', {
      message: req.flash('message'),
    });
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash    : true,
  }));

  // Signup page
  app.get('/signup', function(req, res) {
    res.render('signup.pug', {
      message: req.flash('message'),
    });
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash    : true,
  }));

  // Profile page
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', { user: req.user });
  });

  // Logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route middlewares registration
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }
}
