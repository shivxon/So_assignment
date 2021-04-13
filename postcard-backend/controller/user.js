const User = require('../models/user')
const jwtService = require('../middleware/auth')
const bcrypt = require('bcryptjs');

const signup = async(req, res) => {
    try {
        let userObj = {
            fullName: req.body.fullName,
            email: req.body.email,
            encryptedPassword: req.body.password
        }
        let user = await User.create(userObj)
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
const login = async(req, res) => {
    try {
        console.log(req.body.email)

        let user = await User.findOne({ email: req.body.email })
        let isMatch = bcrypt.compareSync(req.body.password, user.encryptedPassword)
        if (isMatch) {
            let jwtToken = jwtService.getToken(user);
            user.token = jwtToken

            await User.updateOne({ email: req.body.email }, {
                $set: {
                    'token': jwtToken
                }
            }, { upsert: true })
            return res.status(200).send(user);
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const getProfile = async(req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id })
        if (user) {
            return res.status(200).send(user);
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}
const logout = async(req, res) => {
    try {
        let user = await User.findOneAndUpdate({ _id: req.user._id }, {
            $set: {
                token: ''
            }
        }, { upsert: true })
        res.status(200).json({ message: "sucsess" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = {
    signup,
    login,
    logout,
    getProfile
};