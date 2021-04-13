const bcrypt = require('bcryptjs');

const encryptPassword = (next, user) => {
    // if (!user.isModified('encryptedPassword')) return next()
    try {
        let salt = bcrypt.genSaltSync(5);
        let hash = bcrypt.hashSync(user.encryptedPassword, salt)
        if (hash) {
            user.encryptedPassword = hash;
            return next();
        }
    } catch (error) {
        return error;
    }
}


module.exports = encryptPassword;