const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const emailvalidation = require('../services/emailandpasswordvalidation');
const passwordvalidation = require('../services/emailandpasswordvalidation');
const verifyPassword = require('../services/verifyPassword');
const encryptPassword = require('../services/passwordencryption');

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['User'],
        default: 'User'
    },
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [emailvalidation.validateEmailFormat, 'Please fill a valid email address'],
    },
    encryptedPassword: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function(next) { passwordvalidation.validatePasswordFormat(next, this); });

userSchema.pre('save', function(next) { encryptPassword(next, this); });

userSchema.methods.verifyPassword = function(password, callback) { verifyPassword(this, password, callback); }


module.exports = mongoose.model('User', userSchema);