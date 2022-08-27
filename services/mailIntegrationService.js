var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    // host:"45.116.122.166",
    // port:26,
    // port: 587,
    // port:465,
    secureConnection: true,

    auth: {
      user: "rakesh81238529@gmail.com",
      pass: "cdhqkcoxvonvozvt"
    },
    tls: {
      rejectUnauthorized: false
    }
});

const sendEmail = (toMail, subject, body) => {
  return new Promise((resolve, reject) => {
    var mailOptions = {
      from: "Opal-Mentoring <info@opaltechsolutions.com>",
      to: toMail,
      subject: subject,
      text: body,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject("Fail")
      } else {
        resolve("pass")
      }
    });
  })
  
};

module.exports = sendEmail;
