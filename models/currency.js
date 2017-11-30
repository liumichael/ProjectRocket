var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var currencySchema = mongoose.Schema({

    code: String,
    rate: Number

});

module.exports = mongoose.model('Currency', currencySchema);
