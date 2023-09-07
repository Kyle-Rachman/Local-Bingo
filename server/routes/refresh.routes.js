const RefreshController = require('../controllers/refresh.controller');

module.exports = app => {
    app.get('/api/refresh', RefreshController.refresh);
};