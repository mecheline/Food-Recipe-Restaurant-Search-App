import connectDB from "@/lib/db";
import pendingUser from "@/models/pendingUser";
import User from "@/models/user";

export default async function activateUser(req, res) {
  await connectDB();

  console.log(req.query.token);
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid user1" });
  }
  try {
    const user = await pendingUser.findOne({ resetToken: token });

    if (!user) {
      return res.status(401).json({ message: "Invalid user2" });
    }
    const record = {
      fullname: user.fullname,
      gender: user.gender,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    };
    const newUser = new User({ ...record });

    await newUser.save();
    await pendingUser.findOneAndRemove({ resetToken: token });

    res.status(200).json({ message: "User has been activated" });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid user pls" });
  }
}
