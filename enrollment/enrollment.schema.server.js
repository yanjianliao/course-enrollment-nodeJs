const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema({
    section: {
        type: mongoose.Schema.ObjectId,
        ref: 'SectionModel'
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel'
    },
    grade: {
        type: String,
        default: 'none'
    }
}, {collection: 'enrollments'});

module.exports = enrollmentSchema;