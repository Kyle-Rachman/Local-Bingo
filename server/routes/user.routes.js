const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findUser);
    app.patch('/api/users/:id', authenticate, UserController.updateExistingUser);
    app.delete('/api/users/:id', authenticate, UserController.deleteUser);
    app.post('/api/users/register', UserController.registerUser);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
};