import connectDB from "@/lib/db";
import pendingUser from "@/models/pendingUser";
import User from "@/models/user";
import { confirmationLinkEmail } from "@/nodemailer/mail";
// import { Resend } from "resend";

import { hash } from "bcrypt";

const crypto = require("crypto");

export default async function signup(req, res) {
  await connectDB();
  if (req.method == "POST") {
    console.log(req.body);
    const { fullname, gender, email, password } = req.body;
    if (
      !fullname ||
      fullname.trim().length < 0 ||
      !gender ||
      gender.trim().length < 0 ||
      !email ||
      email.trim().length < 0 ||
      !password ||
      password.trim().length < 0
    ) {
      return res.status(422).json({ error: "Please fill out all the fields" });
    }
    try {
      const user = await User.findOne({ email });
      const pendinguser = await pendingUser.findOne({ email });
      if (user || pendinguser) {
        return res
          .status(422)
          .json({ error: "User with the email already exists" });
      }
      let token;
      crypto.randomBytes(127, (err, buf) => {
        if (err) {
          console.log(err);
          return;
        }

        // Prints random bytes of generated data
        token = buf.toString("hex");
      });
      const newUser = new pendingUser({
        fullname,
        gender,
        email,
        isAdmin: false,
        password: await hash(password, 12),
        resetToken: token,
      });
      const result = await newUser.save();

      // const resend = new Resend(process.env.RESEND);

      // resend.emails.send({
      //   from: process.env.USER,
      //   to: result.email,
      //   subject: "Verify Email Link",
      //   html: `<a target="_" href="${process.env.NEXTAUTH_URL}/verify-email/${result.resetToken}">Click on the link to confirm your email</a>`,
      // });

      await confirmationLinkEmail(result.resetToken, result.email);
      res.status(200).json({
        message: "Check your email to activate your account",
        // result,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
