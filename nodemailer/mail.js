import nodemailer from "nodemailer";

export const confirmationLinkEmail = (token, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: process.env.USER, // sender address
    to: email, // list of receivers
    subject: "Verify Email Link", // Subject line
    html: `<a target="_" href="${process.env.NEXTAUTH_URL}/verify-email/${token}">Click on the link to confirm your email</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const resetPasswordEmail = (token, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: process.env.USER, // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    html: `<a target="_blank" href="${process.env.NEXTAUTH_URL}/reset-password/${token}">Click on the link to reset your password</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
