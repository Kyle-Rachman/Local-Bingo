const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/users', authenticate, UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findUser);
    app.post('/api/users/register', UserController.registerUser);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.patch('/api/users/:id', UserController.updateExistingUser);
    app.delete('/api/users/:id', UserController.deleteUser);
};