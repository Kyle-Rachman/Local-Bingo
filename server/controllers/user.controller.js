const User = require('../models/user.model');

// Create Commands for User

const registerUser = (req, res) => {
    // User.exists({
    //     firstName: req.body.firstName,
    //     lastInitial: req.body.lastInitial
    // })
    // .then( userExists => {
    //     if (userExists) {
    //         return Promise.reject('This user already exists!')
    //     }
    //     return User.create(req.body);
    // })
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json(user);
    })
    .catch((err) => res.status(400).json(err));
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
        if(!user) {
            return res.sendStatus(400);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    } catch(err) {
        res.status(400).json(err);
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