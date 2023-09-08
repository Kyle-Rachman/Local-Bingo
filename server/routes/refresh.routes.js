const RefreshController = require('../controllers/refresh.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/refresh', RefreshController.refresh);
};