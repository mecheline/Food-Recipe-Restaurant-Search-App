import { randomBytes } from "crypto";

import connectDB from "@/lib/db";
import { resetPasswordEmail } from "@/nodemailer/mail";
import User from "@/models/user";

export default async function resetPassword(req, res) {
  await connectDB();
  if (req.method !== "POST") {
    return;
  }

  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(422).json({ error: "Input your email" });
  }
  try {
    const record = await User.findOne({ email });
    if (!record) {
      return res.status(401).json({ error: "User not found" });
    }

    randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token =  buffer.toString("hex");
      record.resetToken = token;
      record.expireToken = Date.now() + 3600000;
      const result = await record.save();
      if (!result) {
        return res.status(501).json({ error: "Try again later" });
      }
      await resetPasswordEmail(result.resetToken, result.email);
      res.status(200).json({
        message: "Check your email to reset your password",
        // result,
      });
    });
  } catch (error) {
    console.log(error);
  }

  //   const token = await compare(email, record.token);
  //   if (!token) {
  //     return res.json({ message: "User not found" });
  //   }

  // async..await is not allowed in global scope, must use a wrapper
  //   async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  //   main().catch(console.error);
}
