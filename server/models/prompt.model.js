const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Text is required!'],
        maxLength: [45, "That's too long!"]
    }
}, { timestamps: true });

const Prompt = mongoose.model('Prompt', PromptSchema);
module.exports = Prompt;