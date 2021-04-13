const jwt = require('jsonwebtoken');
const User = require('../models/user');


const getToken = user => {
    const token = jwt.sign({
            data: { id: user._id },
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: process.env.JWT_ALGO,
        });
    return token;
}

const verifyJwtToken = async(req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.data.id });
        if (user) {
            req.user = user;
            next();

        } else {
            res.status(401).json({
                message: 'INVALID_JWT_TOKEN',
                status: 401,
            });
        }
    } catch (error) {
        res.status(401).json({
            message: 'INVALID_JWT_TOKEN',
            status: 401,
        });
    }
};
module.exports = {
    getToken,
    verifyJwtToken
};