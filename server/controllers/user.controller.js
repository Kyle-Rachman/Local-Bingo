const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
// Will need this for login funcitonality
const bcrypt = require('bcrypt');
// Create Commands for User

const registerUser = async (req, res) => {
    try {
        const potentialUser = await User.findOne({
            firstName: req.body.firstName,
            lastInitial: req.body.lastInitial
        });
        if (potentialUser) {
            return res.status(400).json({
            message: "User already exists"
            });
        }
        const newUser = await User.create(req.body);
        const userToken = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY);
        res.cookie("usertoken", userToken, {httpOnly: true}).json({
            message: "Success!",
            user: newUser
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

// Read Commands for User

const findAllUsers = (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json(allUsers)
        })
        .catch((err) => res.status(400).json(err));
};

const findUser = (req, res) => {
    User.exists({ _id: req.params.id })
    .then( userExists => {
        if (userExists) {
            return User.findOne({ _id: req.params.id })
        }
        return Promise.reject('This user does not exist!');
    })
    .then(saveResult => res.json(saveResult))
    .catch((err) => res.status(400).json(err));
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
    .then(saveResult => res.json(saveResult))
    .catch((err) => res.status(400).json(err));
};

// Delete Commands for User

const deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => res.status(400).json(err));
};

// Other Commands for User

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            firstName: req.body.firstName,
            lastInitial: req.body.lastInitial
        });
        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (passwordMatch) {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY); // can add {expiresIn: "2h"} make this expire in 2h or later with "7d" or "24h"
                res.cookie("usertoken", userToken, {httpOnly: true}).json({
                    message: "Login successful!",
                    user: user
                });
            } else {
                res.status(400).json({
                message: "Invalid login attempt"
                });
            }
        } else {
            res.status(400).json({
            message: "Invalid login attempt"
            });
        };
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    };
}

const logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}


module.exports = {
    registerUser,
    findAllUsers,
    findUser,
    updateExistingUser,
    deleteUser,
    login,
    logout
};