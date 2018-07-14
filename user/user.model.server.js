const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);


function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(user) {
    return userModel.findOne(user)
}


const api = {
    createUser: createUser,
    findUserByCredentials: findUserByCredentials
};

module.exports = api;