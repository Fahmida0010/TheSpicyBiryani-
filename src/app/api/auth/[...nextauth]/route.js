import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
          image: user.image,
          createdAt: new Date(),
        });
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };