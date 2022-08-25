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

const sendEmail = (toMail) => {
  var mailOptions = {
    from: "Welcome <rakesh81238529@gmail.com>",
    to: 'rakeshssk2010@gmail.com',
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
