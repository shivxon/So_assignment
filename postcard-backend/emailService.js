const emailConfig = require('./emailonfig')
var ejs = require("ejs");

const sendTextMail = async(data, email, subject) => {

    let transporter = await emailConfig.config(); // call transport configurations.
    var mainOptions = {
        from: '"Shivam" <shivam.vashishtha1997@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: data
    };
    transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
            console.log('dfdgfdfgg.........................', err);
            return "Email failed."
        } else {
            console.log('Message sent: ' + info.response);
            return "Email sent";
        }
    });
}


module.exports = { sendTextMail };