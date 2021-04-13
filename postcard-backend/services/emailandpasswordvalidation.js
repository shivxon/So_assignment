const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmailFormat = (email) => {
    return emailRegExp.test(email);
}

const passwordRegExp = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;




const validatePasswordFormat = (next, user) => {
    let matched = passwordRegExp.test(user.encryptedPassword)
    if (matched) {
        next();
    }

}

module.exports = {
    validateEmailFormat,
    validatePasswordFormat

}