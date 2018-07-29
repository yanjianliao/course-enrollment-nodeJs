module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete('/api/student/:studentId/section/:sectionId/', deleteEnrollment);
    app.delete('/api/section/:sectionId/', deleteSection);
    app.put('/api/section/:sectionId/', updateSection);

    const sectionModel = require('../section/section.model.server');
    const enrollmentModel = require('../enrollment/enrollment.model.server');


    function updateSection(req, res) {
        const section = req.body;
        sectionModel.updateSection(section)
            .then(() => res.json(section));
    }


    function deleteSection(req, res) {
        const sectionId = req.params['sectionId'];

        sectionModel.deleteSection(sectionId)
            .then(() => enrollmentModel.deleteEnrollmentsBySection(sectionId))
            .then(() => res.send('success'));

    }


    function deleteEnrollment(req, res) {
        const sectionId = req.params['sectionId'];
        const studentId = req.session['currentUser']._id;
        const enrollment = {
            section: sectionId,
            student: studentId
        };

        sectionModel.incrementSectionSeats(sectionId)
            .then(() => {
                enrollmentModel
                    .deleteEnrollment(enrollment)
                    .then(res.json(enrollment));
            });


    }


    function findSectionsForStudent(req, res) {
        let currentUser = req.session.currentUser;
        let studentId = currentUser._id;

        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(enrollments => {
                res.json(enrollments)
            });
    }

    function enrollStudentInSection(req, res) {
        const sectionId = req.params['sectionId'];
        const studentId = req.session['currentUser']._id;
        const enrollment = {
            section: sectionId,
            student: studentId
        };

        sectionModel.decrementSectionSeats(sectionId)
            .then(() => {
                enrollmentModel
                    .enrollStudentInSection(enrollment)
                    .then(enrollment => res.json(enrollment));
            });
    }


    function createSection(req, res) {
        let section = req.body;

        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            });

    }

    function findSectionsForCourse(req, res) {
        const courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            });
    }
};