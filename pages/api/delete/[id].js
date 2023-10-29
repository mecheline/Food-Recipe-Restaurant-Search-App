import connectDB from "@/lib/db";
import User from "@/models/user";

export default async function deleteUser(req, res) {
  await connectDB();
  if (req.method == "DELETE") {
    const { id } = req.query;

    try {
      const user = await User.findOneAndRemove({ _id: id }, { new: true });

      if (user) {
        return res.status(200).json({ message: "User deleted successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
