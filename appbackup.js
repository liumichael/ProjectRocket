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
var app = express();


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


// Routes
// !!!NOTE that values are hard coded for now!!!
// !!!NOTE: use -X!!
// Examples for performing CRUD:
// curl -XGET http://localhost:3964/api/countries
// curl -XPUT http://localhost:3964/api/countries/Canada
// curl -XPOST http://localhost:3964/api/countries
// curl -XDELETE http://localhost:3964/api/countries/Canada

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/api', function (req, res) {
    // This doesn't send users the right things without the database
    // db.loadAll() gets the data from other API and returns a promise
    // I called it just to test the data format
    // After we have the database, we'll just set apiData = all country and
    // currency data from the database and call res.send(apiData);
    res.send(db.loadAll());
});


// For country API
app.get('/api/countries', function (req, res) {
    res.send(db.getAllCountries());
});

app.get('/api/countries/:countryName', function (req, res) {
    console.dir(req.params.countryName);
    res.send(db.getCountry(req.params.countryName));
});

var country = {
    'Canada': {
        "name": 'Canada',
        "flag": 'https://restcountries.eu/data/can.svg',
        "capital": 'Toronto',
        "region": 'Northern America',
        "population": 36155487,
        "languages": ['English', 'French'],
        "currency": 'CAD',
        "callingCodes": '1',
        "timezones": ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
        "reviews": {}
    },
    "Belgium": {
        "name":"Belgium",
        "flag":"https://restcountries.eu/data/bel.svg",
        "capital":"Brussels",
        "region":"Western Europe",
        "population":11319511,
        "languages":["Dutch","French","German"],
        "currency":"EUR",
        "callingCodes":["32"],
        "timezones":["UTC+01:00"],
        "reviews":{}
    }
}

// Post, Put, Delete method don't return anything to the user. They just update
// the data.
app.put('/api/countries/:countryName', function (req, res) {
    console.dir(req.params.countryName);
    res.send(db.putCountry(req.params.countryName, country['Canada']));
});

app.post('/api/countries', function (req, res) {
    res.send(db.postCountry(country["Belgium"]));
});

app.delete('/api/countries/:countryName', function (req, res) {
    console.dir(req.params.countryName);
    res.send(db.deleteCountry(req.params.countryName));
});


// For currencies
app.get('/api/currencies', function (req, res) {
    res.send(db.getAllCurrencies());
});

app.get('/api/currencies/:code', function (req, res) {
    console.dir(req.params.code);
    res.send(db.getCurrency(req.params.code));
});

var currency = {
    "AUD": {
        "code": "AUD",
        "value": 20.0357
    },
    "BGN": {
        "code": "BGN",
        "value": 1.3066
    }
}

// Post and Put method doesn't return anything to the user. They just update the
// data.
app.put('/api/currencies/:code', function (req, res) {
    console.dir(req.params.code);
    res.send(db.putCurrency(req.params.code, currency["AUD"]));
});

app.post('/api/currencies', function (req, res) {
    res.send(db.postCurrency(currency["BGN"]));
});

app.delete('/api/currencies/:code', function (req, res) {
    console.dir(req.params.code);
    res.send(db.deleteCurrency(req.params.code));
});

// For msg endpoints
app.get('/api/messages', function (req, res) {
    res.send(db.getAllMessages());
});

app.get('/api/messages/:id', function (req, res) {
    console.dir(req.params.id);
    res.send(db.getMessage(req.params.id));
});

var message = {
    'msg2': {
        "id": '2',
        "msg": 'blah2',
        "read": 'False'
    }
}
app.post('/api/messages', function (req, res) {
    db.postMessage(message['msg2']);
    res.send(db.getAllMessages());
});

app.delete('/api/messages/:id', function (req, res) {
    console.dir(req.params.id);
    db.deleteMessage(req.params.id);
    res.send(db.getAllMessages());
});

//authentication
app.post('/login.html',
    passport.authenticate('local-login', { successRedirect: '/index.html',
                                     successFlash: "Welcome Back!",
                                     failureRedirect: '/login.html',
                                     failureFlash: 'Invalid username or password.'
                                 }));


app.listen(port, () => {
    console.log('RESTful API server listening on: ' + port);
});

// Data we need for a country page
// Ex:
/**data = {
    'Canada': {
        name: 'Canada',
        flag: 'img url',
        capital: 'Ottawa',
        region: 'Northern America',
        population: 36155487,
        languages: ['English', 'French'],
        currency: 'CAD',
        callingCodes: 1,
        timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30']
        reviews: {review1: {
                    userID: 15431,
                    rate: 4,
                    detail: 'Love this place'},
                  review2......
                }
    }
} **/

/* getCountryAPIInfo and getCurrencyAPI extract the data we want from the APIs
 * we use. We might need to add things to some fields by ourselves like reviews.
 */
function getCountryAPIInfo() {

    return new Promise((resolve, reject) => {
        var request = require('request');
        var url = "https://restcountries.eu/rest/v2";
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error);
            }
            else if (response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data);
            }
        });
    });
}

function getCurrencyAPI() {
    return new Promise((resolve, reject) => {
        var request = require('request');
        var url = "http://api.fixer.io/latest?base=CAD";
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error);
            }
            else if (response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data);
            }
        });
    });
}

const db = (function () {
    // Temptative data structure
    /* apidata = {
        'Countries': {
            'Canada': {
                "name": 'Canada',
                "flag": 'https://restcountries.eu/data/can.svg',
                "capital": 'Ottawa',
                "region": 'Northern America',
                "population": 36155487,
                "languages": ['English', 'French'],
                "currency": 'CAD',
                "callingCodes": '1',
                "timezones": ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
                "reviews": {'review1': {
                            'userID': 15431,
                            'rate': 4,
                            'detail': 'Love this place'}}
            },
            'Australia': {
                "name": 'Australia',
                "flag": 'https://restcountries.eu/data/aus.svg',
                "capital": 'Canberra',
                "region": 'Australia and New Zealand',
                "population": 24117360,
                "languages": ['English'],
                "currency": 'AUD',
                "callingCodes": '61',
                "timezones": ['UTC+05:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:30'],
                "reviews": {'review1': {
                            'userID': 15431,
                            'rate': 4,
                            'detail': 'Love this place'}}
            },
        },

        'Currencies': {
            "AUD": {"code": "AUD", "value": 1.0357},"BGN": {"code": "BGN", "value": 1.3066}
        },

        'Messages': {
            'msg1': {"id": '1', "msg": 'blah', "read": 'False'}, 'msg1234': {"id": '1234', "msg": 'blah', "read": 'False'}
        }
    }
    */
    // hardcoded apiData for testing purpose
    var apiData = {};
    var countries = {};
    var currencies = {};
    var messages = {};

    var canada = {
        "name": 'Canada',
        "flag": 'https://restcountries.eu/data/can.svg',
        "capital": 'Ottawa',
        "region": 'Northern America',
        "population": 36155487,
        "languages": ['English', 'French'],
        "currency": 'CAD',
        "callingCodes": '1',
        "timezones": ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
        "reviews": {}
    };

    var australia = {
        "name": 'Australia',
        "flag": 'https://restcountries.eu/data/aus.svg',
        "capital": 'Canberra',
        "region": 'Australia and New Zealand',
        "population": 24117360,
        "languages": ['English'],
        "currency": 'AUD',
        "callingCodes": '61',
        "timezones": ['UTC+05:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:30'],
        "reviews": {}
    };

    var aud = {
        "code": "AUD",
        "value": 1.0357
    };

    var msg1 = {
        "id": '1',
        "msg": 'blah1',
        "read": 'False'
    };

    var msg1234 = {
        "id": '1234',
        "msg": 'blah1234',
        "read": 'False'
    };

    countries[canada.name] = canada;
    countries[australia.name] = australia;
    currencies[aud.code] = aud;
    messages['msg1'] = msg1;
    messages['msg1234'] = msg1234;
    apiData['Countries'] = countries;
    apiData['Currencies'] = currencies;
    apiData['Messages'] = messages;

    return { // public interface to the DB layer
        // After we run it once to get all the data we need to the database, we
        //don't need this loadAll anymore
        loadAll: function () {
            getCountryAPIInfo().then(info => {
                var database = {};
                for (i = 0; i < info.length; i ++) {
                    var countryName = info[i].name;
                    var countryInfo = {};
                    countryInfo['name'] = countryName;
                    countryInfo['flag'] = info[i].flag;
                    countryInfo['capital'] = info[i].capital;
                    countryInfo['region'] = info[i].subregion;
                    countryInfo['population'] = info[i].population;
                    var languages = [];
                    var officialLanguages = info[i].languages;
                    for (index in officialLanguages){
                        languages.push(officialLanguages[index].name);
                    }
                    countryInfo['languages'] = languages;
                    countryInfo['currency'] = info[i].currencies[0].code;
                    countryInfo['callingCodes'] = info[i].callingCodes;
                    countryInfo['timezones'] = info[i].timezones;
                    countryInfo['reviews'] = {};
                    database[countryName] = countryInfo;
                }
                //console.log(database);
                // Below is for creating JSON file
                /*var jsdata = JSON.stringify(database);
                var fs = require('fs');
                fs.writeFile("countries.json", jsdata);*/
                return database;
            });
            getCurrencyAPI().then(info => {
                var exchangeRates = info['rates'];
                //console.log(exchangeRates);
                /*var jsdata = JSON.stringify(exchangeRates);
                var fs = require('fs');
                fs.writeFile("currencies.json", jsdata);*/
                return exchangeRates;
            });
        },

        // For Countries.
        getAllCountries: function () {
            return apiData['Countries'];
        },
        getCountry: function (countryName) {
            return apiData['Countries'][countryName];
        },
        putCountry: function(countryName, countryData) {
            apiData['Countries'][countryName] = countryData;
        },
        postCountry: function(countryData) {
            apiData['Countries'][countryData.name] = countryData;
        },
        deleteCountry: function(countryName) {
            delete apiData['Countries'][countryName];
        },

        // For Currencies
        getAllCurrencies: function () {
            return apiData['Currencies'];
        },
        getCurrency: function (currencyCode) {
            return apiData['Currencies'][currencyCode];
        },
        putCurrency: function(currencyCode, currencyData) {
            apiData['Currencies'][currencyCode] = currencyData;
        },
        postCurrency: function(currencyData) {
            apiData['Currencies'][currencyData.code] = currencyData;
        },
        deleteCurrency: function(currencyCode) {
            delete apiData['Currencies'][currencyCode];
        },

        // For Messages
        getAllMessages: function () {
            return apiData['Messages'];
        },
        getMessage: function (messageID) {
            return apiData['Messages']['msg' + messageID];
        },
        postMessage: function(messageData) {
            apiData['Messages']['msg' + messageData.id] = messageData;
        },
        deleteMessage: function(messageID) {
            delete apiData['Messages']['msg' + messageID];
        }
    };
})();
