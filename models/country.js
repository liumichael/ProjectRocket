var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var countrySchema = mongoose.Schema({

    name: String, // key
    flag: String,
    capital: String,
    region: String,
    population: Number,
    languages: [String],
    currency: String,
    callingcodes: String,
    timezones: [String],

});

module.exports = mongoose.model('Country', countrySchema);
