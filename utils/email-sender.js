"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(sendto, subject, body, isplaintext) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hapy.store",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contact@hapy.store",
      pass: "Nyi@EDj3"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let emailOption = {
    from: '"Hapy Store" <contact@hapy.store>', // sender address
    to: sendto.join(','), // list of receivers
  }

  if (subject) {
    emailOption["subject"] = subject; // Subject line
  }
  if (body && isplaintext) {
    emailOption["text"] = body; // plain text body
  }
  if (body && !isplaintext) {
    emailOption["html"] = body; // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(emailOption);

  return Promise.resolve(info);
  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = async (to, subject, body, isplaintext = false) => {    
    if (!Array.isArray(to)) {
        return Promise.reject({ message: "To should be an array of email id/s." });
    }
    let res = await main(to, subject, body, isplaintext).then(e => { return Promise.resolve(e) }).catch(console.error);
    if (!res) {
        return Promise.resolve({ emailSent: false });
    }
    return Promise.resolve({ emailSent: true, deliveryInfo: {...res} });
}