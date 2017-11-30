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
    Country.find({ name: req.params.countryName }, { _id: 0, __v: 0 }, function (err, country) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(country);
        }
    });
}

function putCountry(req, res) {

    console.dir(req.params.countryName);
    Country.findOneAndUpdate({ name: req.params.countryName }, { capital: "Ottawa" },
        function (err, country) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(req.params.countryName + " updated\n");
            }
    });
}

// If you call this with the same data multiple time, it'll just create duplicates with different _id
function postCountry(req, res) {

    var newCountry = new Country({
        name: "TestPost1",
        flag: "",
        capital: "TestCapital"
    });
    newCountry.save(function (err, country) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(country + "\n");
            }
        }
    );
}

function deleteCountry(req, res) {

    console.dir(req.params.countryName);
    Country.findOneAndRemove({ name: req.params.countryName }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(req.params.countryName + " deleted\n");
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
    Currency.findOneAndUpdate({ code: req.params.code }, { rate: 1.0297 },
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

    var newCurrency = new Currency({
        code: "TWD",
        rate: 23.29
    });
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
    Message.find({}, { _id: 0, __v: 0 }, function (err, msgs) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(msgs);
        }
    });
}

function getMessageByID(req, res) {
    Message.find({ id: req.params.id }, { _id: 0, __v: 0 }, function (err, msg) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(msg);
        }
    });
}

function postMessage(req, res) {
    var newMessage = new Message({
        id: 1234,
        data: "Testing 1234 hehehehe",
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

function deleteMessageByID(req, res) {

    console.dir(req.params.id);
    Message.findOneAndRemove({ id: req.params.id }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(req.params.id + " deleted\n");
        }
    });
}
