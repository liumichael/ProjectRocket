var mongoose = require('mongoose');
var Country = require('../models/country');
var Currency = require('../models/currency');
var Message = require('../models/message');
var Review = require('../models/review');


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
    postMessage: postMessage,
    deleteMessageByID: deleteMessageByID,
    getAllReview: getAllReview,
    getCountryReview: getCountryReview,
    getUserReview: getUserReview,
    getProfile: getProfile
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
    console.log(req.body);
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
        console.log(req.body)
        var newCountry = new Country(req.body);
        newCountry.save(function(err, country) {
            if (err) {
                res.send(err);
            } else {
                res.send(country + " posted! \nNote that country names get automatically turned into upper case if they weren't before.\n");
            }
        });
    } else {
        res.send("Error: The field 'name' is a required field!\n")
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

    console.dir(req.params.code);
    console.log(req.body);
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

function postCurrency(req, res) {

    if (req.body.code) {
        console.log(req.body);
        var newCurrency = new Currency(req.body);
        newCurrency.save(function(err, code) {
            if (err) {
                res.send(err);
            } else {
                res.send(code + "\n");
            }
        });
    } else {
        res.send("Error: The field 'code' is a required field!\n");
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
        res.send("Please make sure you add the header: --header 'Content-Type: application/json'\n");
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
    Country.findOne({
        name: req.params.countryName.toUpperCase() // name: req.body.countryName.toUpperCase()
    }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result.reviews);
        }
    });
}

function getUserReview(req, res) {
    Review.find({
        username: req.params.username // username: req.body.username
    }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

function postReview(req, res) {
    var rId = newId();

    var newReview = new Review({
        id: rId,
        username: req.params.username, // username: req.body.username,
        countryName: req.params.countryName, // countryName: req.body.countryName,
        rate: req.params.rate, // rate: req.body.rate,
        content: req.params.content // content: req.body.content

    });

    newReview.save();

    // Country.update({
    //         name: req.params.name.toUpperCase() // name: req.params.body.toUpperCase()
    //     }, {
    //         $push: {
    //             reviews: newReview
    //         }
    //     }, {
    //         upsert: true
    //     },
    //     function(err, result) {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.send("Review posted!");
    //         }
    //     });
}

function putReview(req, res) {

    GroupDeck.findOneAndUpdate({
            id: req.params.id // id: req.body.id
        }, {
            $set: {
                rate: req.params.rate, // rate: req.body.rate,
                content: req.params.content // rate: req.body.content
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
            res.send(err);
        } else {
            console.log(reviews);
            res.render('profile.ejs', {
                user: req.user.local.username,
                userReviews: reviews
            });
        }
    });
}


function newId() {
    return new Date().valueOf();;
}
