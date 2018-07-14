module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);

    const sectionModel = require('../section/section.model.server');

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