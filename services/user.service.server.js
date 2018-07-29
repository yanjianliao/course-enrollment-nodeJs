module.exports = function (app) {

    const userModel = require('../user/user.model.server');

    app.get('/api/profile', profile);
    app.post('/api/user', createUser);
    app.post('/api/login', login);
    app.get('/api/logout', logout);
    app.put('/api/profile', update);
    app.delete('/api/profile', profileDelete);


    function profileDelete(req, res) {
        const user = req.body;
        req.session['currentUser'] = user;
        userModel.profileDelete(user)
            .then(response => res.json(response))
    }

    function update(req, res) {
        const user = req.body;
        req.session['currentUser'] = user;
        userModel.updateUser(user)
            .then(response => res.json(response))
        // res.send('Ok')
    }

    function createUser(req, res) {
        const user = req.body;
        req.session['currentUser'] = user;
        userModel.findUserByUsername(user.username).then(
            response => {
                if(response) {
                    res.json({error: 'Username already token!'})
                } else {
                    userModel
                        .createUser(user)
                        .then(response => res.json(response));
                }
            }
        );

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
                    req.session['currentUser'] = response;
                    res.json(user);
                }
            })
    }

    function profile(req, res) {
        const user = req.session['currentUser'];
        userModel.findUserByUsername(user.username)
            .then(user => res.json(user));
    }

};