module.exports = function (app) {

    const userModel = require('../user/user.model.server');

    app.get('/api/profile', profile);
    app.post('/api/user', createUser);
    app.post('/api/login', login);
    app.get('/api/logout', logout);

    function createUser(req, res) {
        const user = req.body;
        req.session['currentUser'] = user;
        userModel.createUser(user)
            .then(response => res.json(response));
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function login(req, res) {
        const user = req.body;
        userModel.findUserByCredentials(user)
            .then(response => {
                if(!response) {
                    res.json({error: 'Invalid credentials'});
                } else {
                    req.session['currentUser'] = user;
                    res.json(user);
                }
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

};