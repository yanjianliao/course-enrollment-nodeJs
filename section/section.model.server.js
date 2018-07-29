const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    })
}


function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    })
}

function deleteSection(sectionId) {
    return sectionModel.remove({_id: sectionId});
}

function updateSection(section) {
    return sectionModel.findOneAndUpdate({_id : section._id}, {$set: section});
}

const api = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    deleteSection: deleteSection,
    updateSection: updateSection
};

module.exports = api;