const User = require('../models/user.model');

// Create Commands for User

const createUser = (req, res) => {
    User.exists({
        setup: req.body.setup,
        punchline: req.body.punchline
    })
    .then( userExists => {
        if (userExists) {
            return Promise.reject('This user already exists!')
        }
        return User.create(req.body);
    })
    .then(saveResult => res.json(saveResult))
    .catch((err) => res.json(err));
};

// Read Commands for User

const findAllUsers = (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json({ users: allUsers })
        })
        .catch((err) => res.json(err));
};

const findUser = (req, res) => {
    User.exists({ _id: req.params.id })
    .then( userExists => {
        if (userExists) {
            return User.findOne({ _id: req.params.id })
        }
        return Promise.reject('This user does not exist!');
    })
    .then(saveResult => res.json({ user: saveResult}))
    .catch((err) => res.json(err));
};

const findRandomUser = (req, res) => {
    User.countDocuments()
        .then((count) => {
            let random = Math.floor(Math.random() * count);
            return User.findOne().skip(random)
        })
        .then((result) => res.json({ randomUser: result }))
        .catch((err) => res.json(err));
};

// Update Commands for User

const updateExistingUser = (req, res) => {
    User.exists({ _id: req.params.id })
    .then( userExists => {
        if (userExists) {
            return User.findOneAndUpdate({ _id: req.params.id },
                req.body, { new: true, runValidators: true }
                )
        }
        return Promise.reject('This user does not exist!');
    })
    .then(saveResult => res.json({ updatedUser: saveResult}))
    .catch((err) => res.json(err));
};

// Delete Commands for User

const deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((result) => {
            req.json({ result: result})
        })
        .catch((err) => res.json(err));
};

module.exports = {
    createUser,
    findAllUsers,
    findUser,
    findRandomUser,
    updateExistingUser,
    deleteUser
}