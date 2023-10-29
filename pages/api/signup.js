import connectDB from "@/lib/db";
import User from "@/models/user";

import { hash } from "bcrypt";

export default async function signup(req, res) {
  await connectDB();
  if (req.method == "POST") {
    console.log(req.body)
    const { fullname,gender, email, password } = req.body;
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

      if (user) {
        return res
          .status(422)
          .json({ error: "User with the email already exists" });
      }

      const newUser = new User({
        fullname,
        gender,
        email,
        password: await hash(password, 12),
        isAdmin: false,
      });
      const result = await newUser.save();

      res.status(200).json({
        message: "User successfully created",
        result,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
