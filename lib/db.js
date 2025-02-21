import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI environment variable");
}

// Global caching to prevent multiple connections in development mode
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

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Wait 10s before throwing an error if no server is found
      socketTimeoutMS: 20000, // Close sockets after 20s of inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, options);
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
