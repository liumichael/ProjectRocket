var port = process.env.PORT || 3964;
var cors = require('cors');
//var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var express = require('express');
var session = require('express-session')
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var dburl = "mongodb://309:309@ds047478.mlab.com:47478/309teamrocket";
var mongoose = require('mongoose');
var Country = require('./models/country');
var Currency = require('./models/currency');
var Message = require('./models/message');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dburl);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(session({
    secret: 'rockets',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport session setup
//required for persistent login sessions

//used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//local login
passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false);

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false);

            // all is well, return successful user
            return done(null, user);
        });

    }));

//authentication
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
app.post('/login.html', passport.authenticate(
    'local-login', {successRedirect: '/index.html',
                    successFlash: "Welcome Back!",
                    failureRedirect: '/login.html',
                    failureFlash: 'Invalid username or password.'}));

// Routes
require('./routers/router.js')(app, passport);

app.listen(port, () => {
    console.log('RESTful API server listening on: ' + port);
});
