var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = mongoose.Schema({

    id: Number,
    data: String,
    read: Boolean,
    // Use email instead of username as email is unique
    user: String

});

module.exports = mongoose.model('Message', messageSchema);
