var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var reviewSchema = mongoose.Schema({

    id: Number, //key
    username: String,
    countryName: String,
    rate: Number,
    content: String

});

module.exports = mongoose.model('Review', reviewSchema);
