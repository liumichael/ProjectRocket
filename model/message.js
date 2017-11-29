var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var messageSchema = mongoose.Schema({

    id: Number,
    data: String,
    read: Boolean


});

module.exports = mongoose.model('Message', messageSchema);
