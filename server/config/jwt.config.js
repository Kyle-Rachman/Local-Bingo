const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    const token = req.cookies["usertoken"];
    try {
        const data = jwt.verify(token, secret);
        req.userId = data._id;
        req.userRole = data.role;
        return next()
    } catch {
        return res.status(401).json({verified: false})
    }
}