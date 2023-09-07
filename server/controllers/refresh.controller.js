const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const refresh = async (req, res) => {
    try {
        const cookie = req.cookies["usertoken"];
        if (!cookie?.jwt) {
            return res.sendStatus(401);
        };
        const token = cookie.jwt;
        const foundUser = await User.findOne({ userToken: token }).exec();
        if (!foundUser) {
            jwt.verify(
                token,
                process.env.SECRET_KEY,
                async (err, decoded) => {
                    if (err) return res.sendStatus(403); //Forbidden
                    // Delete token of hacked user
                    const hackedUser = await User.findOne({ _id: decoded.id }).exec();
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
        res.json({ userToken })
    } catch (err) {
        console.log(err);
    };
};

module.exports = {
    refresh
};