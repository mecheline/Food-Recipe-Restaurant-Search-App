import mongoose, { connection } from "mongoose";

export default async function connectDB() {
  if (connection[0]) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection Established");
  } catch (error) {
    console.log(error);
  }
}
