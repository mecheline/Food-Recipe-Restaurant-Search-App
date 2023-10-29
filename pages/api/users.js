import connectDB from "@/lib/db";
import User from "../../models/user";

export default async function getAllUsers(req, res) {
  connectDB();
  if (req.method == "GET") {
    try {
        const res = await User.find();
        console.log(res)
      res.status(200).json(res);
    } catch (error) {
      console.log(error);
    }
  }
}
