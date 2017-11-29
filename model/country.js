var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var ReviewSchema = mongoose.model('Review').schema;

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
    reviews: [ReviewSchema]

});

module.exports = mongoose.model('Country', countrySchema);
