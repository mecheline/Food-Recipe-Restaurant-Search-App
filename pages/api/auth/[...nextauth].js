import connectDB from "@/lib/db";
// import clientPromise from "@/lib/mongo";
import User from "@/models/user";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  session: {
    // jwt: true,
    strategy: "jwt",
  },

  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Please fill out all the fields");
        }
        await connectDB().catch((err) => console.log(err));
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const verifyPassword = await compare(password, user.password);
        if (!verifyPassword) {
          throw new Error("Invalid credentials");
        }

        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        return {
          fullname: user.fullname,
          gender:user.gender,
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin,
        };
        // if (user) {
        // Any object returned will be saved in `user` property of the JWT
        // return user;
        // } else {
        // If you return null then an error will be displayed advising the user to check their details.
        // return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
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
