const mongoose = require('mongoose');
const enrollmentSchema = require('./enrollment.schema.server');
const enrollmentModel = mongoose.model('Enrollment', enrollmentSchema);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

function deleteEnrollment(enrollment) {
    return enrollmentModel
        .remove(enrollment);
}

function deleteEnrollmentsBySection(section) {
    return enrollmentModel
        .remove({section: section})
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    deleteEnrollment: deleteEnrollment,
    deleteEnrollmentsBySection: deleteEnrollmentsBySection
};