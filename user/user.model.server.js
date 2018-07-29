const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(user) {
    return userModel.findOne(user,{username: 1});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
}

function updateUser(user) {
    return userModel.findOneAndUpdate(
        { _id: user._id},
        { $set: user});
    // console.log(user);
    // return userModel.findOneAndUpdate(
    //     { username: 'yanjianliao'},
    //     { $set: {newField: 'test12'}});
}
function profileDelete(user) {
    return userModel.findOneAndUpdate(
        { _id: user._id},
        { $set:
                {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                }
        });

}

const api = {
    createUser: createUser,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    updateUser: updateUser,
    profileDelete: profileDelete
};

module.exports = api;