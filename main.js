const express      = require('express');
const mongoose     = require('mongoose');
const passport     = require('passport');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const app          = express();
const port         = process.env.PORT || 3000;

const dbConfig     = require('./config/database');

// Passport configuration
// require('./config/passport')(passport);

// Setup template engine
app.set('view engine', 'pug');

// Middlewares registration
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport requirements
app.use(session({ secret: 'merth' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes registration
require('./app/routes')(app, passport);

app.listen(port, function() {
  console.log('Server running on port 3000');
});
