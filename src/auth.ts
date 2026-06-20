import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const config = {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User does not exist");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        if (!user.isEmailVerified) {
          throw new Error("Please verify your email first");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isEmailVerified = user.isEmailVerified;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 10 * 24 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET,
};

// For next-auth v5 beta.31
// @ts-ignore
const nextAuth = NextAuth(config);

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = nextAuth;