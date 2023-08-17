const PromptController = require('../controllers/prompt.controller');

module.exports = app => {
    app.get('/api/prompts', PromptController.findAllPrompts);
    app.get('/api/prompts/:id', PromptController.findPrompt);
    app.post('/api/prompts/new', PromptController.createPrompt);
    app.patch('/api/prompts/:id', PromptController.updateExistingPrompt);
    app.delete('/api/prompts/:id', PromptController.deletePrompt)
};