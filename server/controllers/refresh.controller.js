const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const refresh = async (req, res) => {
    try {
        const token = req.cookies['usertoken'];
        if (!token) {
            return res.json({ id: 0, role: "User" })
        };
        const foundUser = await User.findOne({ userToken: token });
        if (!foundUser) {
            jwt.verify(
                token,
                process.env.SECRET_KEY,
                async (err, decoded) => {
                    if (err) {
                        return res.sendStatus(403); //Forbidden
                    }
                    // Delete token of hacked user
                    const hackedUser = await User.findOne({ _id: decoded.id });
                    const result = await User.findOneAndUpdate({ _id: hackedUser.id }, {userToken: ""});
                }
            )
            return res.sendStatus(403); //Forbidden
        }
        jwt.verify(
            token,
            process.env.SECRET_KEY,
            async (err, decoded) => {
                if (err || foundUser.id != decoded.id) {
                    return res.sendStatus(403);
                };
            }
        )
        res.json({ id: foundUser.id, role: foundUser.role })
    } catch (err) {
        console.log(err);
    };
};

module.exports = {
    refresh
};