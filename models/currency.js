var mongoose = require('mongoose');

// define the schema for our user model
var currencySchema = mongoose.Schema({

    code: String,
    rate: Number

});

module.exports = mongoose.model('Currency', currencySchema);
