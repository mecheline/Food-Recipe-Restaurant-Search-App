import connectDB from "@/lib/db";

import User from "@/models/user";

import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
 
  session: {
    
    strategy: "jwt",
  },

  providers: [

    CredentialsProvider({

      name: "Credentials",
    
    async authorize(credentials) {
  try {
    const { email, password } = credentials;
    if (!email || !password) {
      throw new Error("Please fill out all fields");
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
      throw new Error("Invalid email or password");
    }

    return {
      fullname: user.fullname,
      gender: user.gender,
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    console.error("❌ Authentication error:", error.message);
    throw new Error("Authentication failed. Please check your credentials.");
  }
}

    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
