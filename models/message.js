var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = mongoose.Schema({

    data: String,
    read: Boolean

});

module.exports = mongoose.model('Message', messageSchema);
