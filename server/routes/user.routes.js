const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findUser);
    app.patch('/api/users/:id', authenticate, UserController.updateExistingUser);
    app.delete('/api/users/:id', authenticate, UserController.deleteUser);
    app.post('/api/users/register', authenticate, UserController.registerUser);
    app.post('/api/users/login', authenticate, UserController.login);
    app.post('/api/users/logout', authenticate, UserController.logout);
};