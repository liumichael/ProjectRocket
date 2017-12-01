var mongoose = require('mongoose');
var Country = require('../models/country');
var Currency = require('../models/currency');
var Message = require('../models/message');


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
    deleteMessageByID: deleteMessageByID
}

// Countries
function getAllCountries(req, res) {
    Country.find({}, { _id: 0, __v: 0 }, function (err, countries) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(countries);
        }
    });
}

function getCountry(req, res) {
    Country.find({ name: req.params.countryName.toUpperCase() }, { _id: 0, __v: 0 }, function (err, country) {
        if (err) {
            res.send(err);
        }
        else {
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
    Country.findOneAndUpdate({ name: req.params.countryName.toUpperCase() }, req.body,
        function (err, country) {
            if (err) {
                res.send(err);
            }
            else {
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
        newCountry.save(function (err, country) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(country + " posted! \nNote that country names get automatically turned into upper case if they weren't before.\n");
                }
            }
        );
    }
    else {
        res.send("Error: The field 'name' is a required field!\n")
    }
}

function deleteCountry(req, res) {

    console.dir(req.params.countryName.toUpperCase());
    Country.findOneAndRemove({ name: req.params.countryName.toUpperCase() }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(req.params.countryName + " deleted! \nNote that country names get automatically turned into upper case if they weren't before.\n");
        }
    });
}



// Currencies
function getAllCurrencies(req, res) {
    Currency.find({}, { _id: 0, __v: 0 }, function (err, currencies) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(currencies);
        }
    });
}

function getCurrency(req, res) {
    Currency.find({ code: req.params.code }, { _id: 0, __v: 0 }, function (err, code) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(code);
        }
    });
}

function putCurrency(req, res) {

    console.dir(req.params.code);
    console.log(req.body);
    Currency.findOneAndUpdate({ code: req.params.code }, req.body,
        function (err, code) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(req.params.code + " updated\n");
            }
    });
}

function postCurrency(req, res) {

    if (req.body.code) {
        console.log(req.body);
        var newCurrency = new Currency(req.body);
        newCurrency.save(function (err, code) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(code + "\n");
                }
            }
        );
    }
    else {
        res.send("Error: The field 'code' is a required field!\n");
    }
}

function deleteCurrency(req, res) {

    console.dir(req.params.code);
    Currency.findOneAndRemove({ code: req.params.code }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(req.params.code + " deleted\n");
        }
    });
}



// Messages
function getAllMessages(req, res){
    Message.find({}, { __v: 0 }, function (err, msgs) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(msgs);
        }
    });
}

function getMessageByID(req, res) {
    Message.find({ _id: req.params.id }, { __v: 0 }, function (err, msg) {
        if (err) {
            res.send(err);
        }
        else {
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
        newMessage.save(function (err, msg) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(msg + "\n");
                }
            }
        );
    }
    else {
        res.send("Please make sure you add the header: --header 'Content-Type: application/json'\n");
    }
}

function deleteMessageByID(req, res) {

    console.dir(req.params.id);
    Message.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(req.params.id + " deleted\n");
        }
    });
}





// function getReview(req, res) {
//     Review.findOne({ id: req.params.id }, function (err, result) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             var stars = result.stars;
//             var content = result.content;
//             res.send(content);
//         }
//     });
// }
