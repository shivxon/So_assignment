const bcrypt = require('bcryptjs');


const verifyPassword = function(user, password, callback) {
    try {
        let isMatch = bcrypt.compareSync(password, user.encryptedPassword)
        if (isMatch) {
            console.log(isMatch)
            callback(null, isMatch);
        }
    } catch (err) {
        return err;
    }

}

module.exports = verifyPassword;