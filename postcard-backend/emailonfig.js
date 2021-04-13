const nodemailer = require("nodemailer");


const config = async() => {
    var config = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 587,
        host: `${process.env.EMAILHOST}`,
        port: `${process.env.EMAILPORT}`,
        secure: true, // true for 465, false for other ports
        auth: {
            user: `${process.env.EMAILUSER}`, // generated ethereal user
            pass: `${process.env.EMAILPASS}` // generated ethereal password
        }
    });
    return config;
}

module.exports = { config };