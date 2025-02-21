// import mongoose, { connection } from "mongoose";

// export default async function connectDB() {
//   if (connection[0]) {
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connection Established");
//   } catch (error) {
//     console.log(error);
//   }
// }


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Establishing new database connection...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Database connection established successfully");
    return cached.conn;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    cached.promise = null;
    throw error;
  }
}

export default connectDB;

