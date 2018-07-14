const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}


const api = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse
};

module.exports = api;