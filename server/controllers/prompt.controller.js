const Prompt = require('../models/prompt.model');

// Create Commands for Prompt

const createPrompt = (req, res) => {
    Prompt.exists({
        text: req.body.text
    })
    .then( promptExists => {
        if (promptExists) {
            return Promise.reject('This prompt already exists!')
        }
        return Prompt.create(req.body);
    })
    .then(saveResult => res.json(saveResult))
    .catch((err) => res.status(400).json(err));
};

// Read Commands for Prompt

const findAllPrompts = (req, res) => {
    Prompt.find()
        .then((allPrompts) => {
            res.json(allPrompts)
        })
        .catch((err) => res.status(400).json(err));
};

const findPrompt = (req, res) => {
    Prompt.exists({ _id: req.params.id })
    .then( promptExists => {
        if (promptExists) {
            return Prompt.findOne({ _id: req.params.id })
        }
        return Promise.reject('This prompt does not exist!');
    })
    .then(saveResult => res.json(saveResult))
    .catch((err) => res.status(400).json(err));
};

// Update Commands for Prompt

const updateExistingPrompt = (req, res) => {
    Prompt.exists({ _id: req.params.id })
    .then( promptExists => {
        if (promptExists) {
            return Prompt.findOneAndUpdate({ _id: req.params.id },
                req.body, { new: true, runValidators: true }
                )
        }
        return Promise.reject('This prompt does not exist!');
    })
    .then(saveResult => res.json(saveResult))
    .catch((err) => res.status(400).json(err));
};

// Delete Commands for Prompt

const deletePrompt = (req, res) => {
    Prompt.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => res.status(400).json(err));
};

module.exports = {
    createPrompt,
    findAllPrompts,
    findPrompt,
    updateExistingPrompt,
    deletePrompt
};