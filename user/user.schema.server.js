const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String
}, {collection: 'user'});

module.exports = userSchema;