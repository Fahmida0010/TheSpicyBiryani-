import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("TheSpicyBiryani");

        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) throw new Error("Wrong password");

        return {
          id: user._id,
          name: user.fullName,
          email: user.email,
          role: user.role || "user", // <-- add role here
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db("TheSpicyBiryani");
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({
        email: user.email,
      });

      if (!existingUser) {
        await usersCollection.insertOne({
          name: user.name,
          email: user.email,
          image: user.image || null,
          role: "user", // <-- default role for new users
          createdAt: new Date(),
        });
      }

      return true;
    },

    async session({ session, token, user }) {
      // Fetch role from DB
      const client = await clientPromise;
      const db = client.db("TheSpicyBiryani");

      const dbUser = await db.collection("users").findOne({
        email: session.user.email,
      });

      session.user.role = dbUser?.role || "user"; // <-- attach role to session

      return session;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role || "user"; // store role in JWT
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };