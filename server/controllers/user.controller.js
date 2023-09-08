const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
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
        const result = await User.findOneAndUpdate({ _id: newUser.id }, {userToken: userToken});
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

const findAllUsersSorted = (req, res) => {
    const field = req.params.field;
    if (req.params.direction) {
        var direction = req.params.direction;
    } else {
        var direction = "";
    };
    User.find().sort(`${direction}` + `${field}`)
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
                req.body, { new: true, runValidators: true })
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
        const foundUser = await User.findOne({
            firstName: req.body.firstName,
            lastInitial: req.body.lastInitial
        });
        if (foundUser) {
            const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password);
            if (passwordMatch) {
                const userToken = jwt.sign({
                    id: foundUser._id
                }, process.env.SECRET_KEY, {expiresIn: "2h"}); // can make this later with "7d" or such
                const result = await User.findOneAndUpdate({ _id: foundUser.id }, {userToken: userToken});
                res.cookie("usertoken", userToken, {httpOnly: true}).json({
                    message: "Login successful!",
                    user: foundUser
                });
            } else {
                res.status(401).json({
                message: "Invalid login attempt"
                });
            }
        } else {
            res.status(401).json({
            message: "Invalid login attempt"
            });
        };
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    };
}

const logout = async (req, res) => {
    try{
        const token = req.cookies['usertoken'];
        const leavingUser = await User.findOne({userToken: token})
        if (!leavingUser) {
            return res.status(204);
        } else {
            const result = await User.findOneAndUpdate({ _id: leavingUser.id }, {userToken: ""});
        }
    } catch (err) {
        console.log(err)
    }
    res.clearCookie('usertoken');
    res.sendStatus(200);
};


module.exports = {
    registerUser,
    findAllUsers,
    findAllUsersSorted,
    findUser,
    updateExistingUser,
    deleteUser,
    login,
    logout
};