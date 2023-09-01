const PromptController = require('../controllers/prompt.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/prompts', PromptController.findAllPrompts);
    app.get('/api/prompts/:id', PromptController.findPrompt);
    app.post('/api/prompts/new', authenticate, PromptController.createPrompt);
    app.patch('/api/prompts/:id', authenticate, PromptController.updateExistingPrompt);
    app.delete('/api/prompts/:id', authenticate, PromptController.deletePrompt)
};