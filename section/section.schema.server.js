const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
   name: String,
   seats: String,
   courseId: Number
}, {collection: 'section'});

module.exports = sectionSchema;