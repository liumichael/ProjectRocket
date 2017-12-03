var mongoose = require('mongoose');
var Country = require('../models/country');
var Currency = require('../models/currency');
var Message = require('../models/message');
var Review = require('../models/review');
var User = require('../models/users');


module.exports = {
    getAllCountries: getAllCountries,
    getCountry: getCountry,
    putCountry: putCountry,
    postCountry: postCountry,
    deleteCountry: deleteCountry,
    getAllCurrencies: getAllCurrencies,
    getCurrency: getCurrency,
    putCurrency: putCurrency,
    postCurrency: postCurrency,
    deleteCurrency: deleteCurrency,
    getAllMessages: getAllMessages,
    getMessageByID: getMessageByID,
    putMessageByID: putMessageByID,
    postMessage: postMessage,
    deleteMessageByID: deleteMessageByID,
    deleteAllMessages: deleteAllMessages,
    getAllReview: getAllReview,
    getCountryReview: getCountryReview,
    getUserReview: getUserReview,
    getProfile: getProfile,
    changeUsername: changeUsername
}

// Countries
function getAllCountries(req, res) {
    Country.find({}, {
        _id: 0,
        __v: 0
    }, function(err, countries) {
        if (err) {
            res.send(err);
        } else {
            res.json(countries);
        }
    });
}

function getCountry(req, res) {
    Country.find({
        name: req.params.countryName.toUpperCase()
    }, {
        _id: 0,
        __v: 0
    }, function(err, country) {
        if (err) {
            res.send(err);
        } else {
            res.json(country);
        }
    });
}

function putCountry(req, res) {

    console.dir(req.params.countryName.toUpperCase());
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
    }
    Country.findOneAndUpdate({
            name: req.params.countryName.toUpperCase()
        }, req.body,
        function(err, country) {
            if (err) {
                res.send(err);
            } else {
                res.send(req.params.countryName.toUpperCase() + " updated! \nNote that country names get automatically turned into upper case if they weren't before.\n");
            }
        });
}

// If you call this with the same data multiple time, it'll just create duplicates with different _id
function postCountry(req, res) {

    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
        var newCountry = new Country(req.body);
        newCountry.save(function(err, country) {
            if (err) {
                res.send(err);
            } else {
                res.send(country + " posted! \nNote that country names get automatically turned into upper case if they weren't before.\n");
            }
        });
    } else {
        res.send("If you're passing in JSON data, please add the header --header 'Content-Type: application/json'\nPlease make sure the data you pass in has the name attribute, as the field 'name' is a required field!");
    }
}

function deleteCountry(req, res) {

    console.dir(req.params.countryName.toUpperCase());
    Country.findOneAndRemove({
        name: req.params.countryName.toUpperCase()
    }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(req.params.countryName + " deleted! \nNote that country names get automatically turned into upper case if they weren't before.\n");
        }
    });
}



// Currencies
function getAllCurrencies(req, res) {
    Currency.find({}, {
        _id: 0,
        __v: 0
    }, function(err, currencies) {
        if (err) {
            res.send(err);
        } else {
            res.json(currencies);
        }
    });
}

function getCurrency(req, res) {
    Currency.find({
        code: req.params.code
    }, {
        _id: 0,
        __v: 0
    }, function(err, code) {
        if (err) {
            res.send(err);
        } else {
            res.json(code);
        }
    });
}

function putCurrency(req, res) {

    if ((typeof(req.body.rate) != "undefined") && (typeof(req.body.rate) != "number")) {
        res.send("Error: the value of rate has to be a number\n");
    }
    else {
        Currency.findOneAndUpdate({
                code: req.params.code
            }, req.body,
            function(err, code) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(req.params.code + " updated\n");
                }
            });
    }

}

function postCurrency(req, res) {

    if (req.body.code && req.body.rate) {
        console.log(req.body);
        if (typeof(req.body.rate) != "number") {
            res.send("Error: the value of rate has to be a number\n");
        }
        else {
            var newCurrency = new Currency(req.body);
            newCurrency.save(function(err, code) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(code + "\n");
                }
            });
        }
    } else {
        res.send("If you're passing in JSON data, please add the header --header 'Content-Type: application/json'\nPlease make sure the data you pass in has attributes code and rate, as the fields 'code' and 'rate' are required fields!");
    }
}

function deleteCurrency(req, res) {

    console.dir(req.params.code);
    Currency.findOneAndRemove({
        code: req.params.code
    }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(req.params.code + " deleted\n");
        }
    });
}



// Messages
function getAllMessages(req, res) {
    Message.find({}, {
        __v: 0
    }, function(err, msgs) {
        if (err) {
            res.send(err);
        } else {
            res.json(msgs);
        }
    });
}

function getMessageByID(req, res) {
    Message.find({
        _id: req.params.id
    }, {
        __v: 0
    }, function(err, msg) {
        if (err) {
            res.send(err);
        } else {
            res.json(msg);
        }
    });
}

// For changing the read flag to true once a message has been read
function putMessageByID(req, res) {
    Message.findOneAndUpdate({
            _id: req.params.id
        }, {
            read: true
        },
        function(err, code) {
            if (err) {
                res.send(err + "req.params.id\n");
            } else {
                res.send(req.params.id + " updated\n");
            }
        });
}

function postMessage(req, res) {

    console.log(req.body);
    if (req.body.data) {
        var newMessage = new Message({
            data: req.body.data,
            read: false
        });
        newMessage.save(function(err, msg) {
            if (err) {
                res.send(err);
            } else {
                res.send(msg + "\n");
            }
        });
    } else {
        res.send("If you're passing in JSON data, please add the header --header 'Content-Type: application/json'\nPlease make sure the data you pass in has the data attribute, as the field 'data' is a required field!\n");
    }
}

function deleteMessageByID(req, res) {

    console.dir(req.params.id);
    Message.findOneAndRemove({
        _id: req.params.id
    }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(req.params.id + " deleted\n");
        }
    });
}

function deleteAllMessages(req, res) {
    Message.remove({},
        function(err, msgs) {
            if (err) {
                res.send(err);
            } else {
                res.json(msgs);
            }
        });
}



function getAllReview(req, res) {
    Review.find({}, {
        _id: 0,
        __v: 0
    }, function(err, reviews) {
        if (err) {
            res.send(err);
        } else {
            res.json(reviews);
        }
    });
}


function getCountryReview(req, res) {
    Review.find({
        countryName: req.params.countryName.toUpperCase() // name: req.body.countryName.toUpperCase()
    }, {
        _id: 0,
        __v: 0
    }, function(err, reviews) {
        if (err) {
            res.send(err);
        } else {
            res.json(reviews);
        }
    });
}

function getUserReview(req, res) {
    Review.find({
        username: req.params.userName
    }, {
        _id: 0,
        __v: 0
    }, function(err, reviews) {
        if (err) {
            res.send(err);
        } else {
            res.json(reviews);
        }
    });
}

function postReview(req, res) {
    var rId = newId();

    var newReview = new Review({
        username: req.body.username, // username: req.params.username,
        countryName: req.body.countryName, // countryName: req.params.countryName,
        rate: req.body.rate, // rate: req.params.rate,
        content: req.body.content // content: req.params.content
    });

    newReview.save();
}

function putReview(req, res) {

    Review.findOneAndUpdate({
            username: req.body.username, // id: req.body.id
            countryName: req.body.countryName
        }, {
            $set: {
                rate: req.body.rate, // rate: req.params.rate,
                content: req.body.content // rate: req.params.content
            }
        }, {
            upsert: true
        },
        function(err, result) {
            if (err) {
                res.status(404);
                res.send(err);
            } else {
                res.send("Review changed!");
            }
        });
}

function getProfile(req, res) {

    Review.find({
        username: req.user.local.username
    }, {
        _id: 0,
        __v: 0
    }, function(err, reviews) {
        if (err) {
            res.redirect('/index'));
        } else {
            console.log(reviews);
            res.render('profile.ejs', {
                user: req.user.local.username,
                userReviews: reviews
            });
        }
    });
}

function changeUsername(req, res){
    User.findOneAndUpdate({
        username: req.user.local.username
    }, {
        $set: {username: req.body.username}

    }, function(err, response) {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect('/profile')
        }
    });
}

// function newId() {
//     return new Date().valueOf();;
// }
