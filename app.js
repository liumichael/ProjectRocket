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
var User = require('./models/users');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dburl);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(session({
    secret: 'rockets',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', './public');
app.set('view engine', 'ejs');
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
                return done(null, false, req.flash('loginMessage', 'User not found.'));
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

            // all is well, return successful user
            return done(null, user);
        });

    }));

//local signup
passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, email, password, done) {
    User.findOne({ 'local.email' : email}, function(err, user) {
        if (err)
            return done(err);
        //check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken. Try using another email.'));
        }
        else {
            console.log("user not found");
            //if there is no user with that email, create the user
            var newUser = new User();
            //set the user's local credentials
            newUser.local.email = email;
            newUser.local.username = email;
            newUser.local.password = newUser.generateHash(password);

            //save the user
            newUser.save(function(err){
                if (err)
                    throw err;
                return done(null, newUser)
            });
        }
    })
}));

// Routes
require('./routers/router.js')(app, passport);

app.listen(port, () => {
    console.log('RESTful API server listening on: ' + port);
});
