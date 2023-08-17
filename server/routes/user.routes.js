const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/random', UserController.findRandomUser);
    app.get('/api/users/:id', UserController.findUser);
    app.post('/api/users/new', UserController.createUser);
    app.patch('/api/users/:id', UserController.updateExistingUser);
    app.delete('/api/users/:id', UserController.deleteUser)
};