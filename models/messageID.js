var mongoose = require('mongoose');

// This schema is solely for storing id number for message.
// Please don't try to modify it.

var messageIDSchema = mongoose.Schema({
    
    id: Number
});

module.exports = mongoose.model('MessageID', messageIDSchema);
