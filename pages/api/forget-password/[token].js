import { hash } from "bcrypt";
import connectDB from "../../../lib/db";
import User from "../../../models/user";

export default async function confirmPassword(req, res) {
  await connectDB();
  if (req.method !== "POST") {
    return;
  }
  console.log(req.body);
  console.log(req.query.token);
  const { password, newpassword } = req.body;
  if (!password || !newpassword) {
    return res.status(422).json({ error: "Please fill out all the fields" });
  }
  if (password !== newpassword) {
    return res.status(422).json({ error: "Password not match" });
  }
  
  const token = req.query.token;
  try {
    const record = await User.findOne({
      resetToken: token,
      expireToken: { $gt: Date.now() },
    });

    if (!record) {
      return res.status(422).json({ error: "Try again, session expired" });
    }

    const hashNewPassword = await hash(password, 12);
    record.password = hashNewPassword;
    record.resetToken = undefined;
    record.expireToken = undefined;
    const updatedRecord = await record.save();
    res
      .status(200)
      .json({ message: "Password successfully updated", updatedRecord });
  } catch (error) {
    console.log(error);
  }
}
