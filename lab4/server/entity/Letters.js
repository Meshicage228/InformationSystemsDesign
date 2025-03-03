const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    date: Date,
    isRegistered: Boolean
});

module.exports = mongoose.model('Letter', letterSchema);