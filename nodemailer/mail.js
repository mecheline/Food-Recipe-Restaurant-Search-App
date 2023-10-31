import nodemailer from "nodemailer";

export const confirmationLinkEmail = async (token, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  const mailData = {
    from: process.env.USER, // sender address
    to: email, // list of receivers
    subject: "Verify Email Link", // Subject line
    html: `<a target="_" href="${process.env.NEXTAUTH_URL}/verify-email/${token}">Click on the link to confirm your email</a>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

// let info = transporter.sendMail({
//   from: process.env.USER,
//   to: email,
//   subject: "Verify Email Link",
//   html: `<a target="_" href="${process.env.NEXTAUTH_URL}/verify-email/${token}">Click on the link to confirm your email</a>`,
// });

// console.log("Message sent: %s", info.messageId);

// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

export const resetPasswordEmail = async (token, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  const mailData = {
    from: process.env.USER, // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    html: `<a target="_blank" href="${process.env.NEXTAUTH_URL}/reset-password/${token}">Click on the link to reset your password</a>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });

  // let info = transporter.sendMail({
  //   from: process.env.USER,
  //   to: email,
  //   subject: "Reset Password Link",
  //   html: `<a target="_blank" href="${process.env.NEXTAUTH_URL}/reset-password/${token}">Click on the link to reset your password</a>`,
  // });

  // console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
