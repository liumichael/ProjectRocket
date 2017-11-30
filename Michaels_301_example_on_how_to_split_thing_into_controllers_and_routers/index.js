// environment variables ======================================================================
require('dotenv').config();

// set up ======================================================================
// get all the tools we need
var fs = require('fs');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var PORT = process.env.PORT || 3000;

// configuration ======================================================================
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);

require('./config/passport')(passport); // pass passport for configuration

app.use(expressValidator());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
// required for passport
app.use(session({
  secret: 'apfepaijfpoaijsopefi',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
require('./router/main.routes.js')(app, passport);

// launch ======================================================================
app.listen(PORT, () => {
    console.log(`Facecard is running on port ${ PORT }`);
});
