import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { routeKindToIncrementalCacheKind } from "next/dist/server/response-cache/utils";


export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw Error("missing credentials");
        }

        await connectDB();
        const email = credentials.email;
        const password = credentials.password as string;
        const user = await User.findOne({ email });
        if (!user) {
          throw Error("user doesn't exist!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw Error("incorrect Password");
        }

        if (!user.isEmailVerified) {
          throw Error("please verify your email first");
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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks: {
    
    async signIn({user, account}){
      if(account?.provider === 'google'){
        await connectDB();
        let dbUser = await User.findOne({email: user.email})
        if(!dbUser){
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            isEmailVerified: true
          })
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role;
        (user as any).isEmailVerified = dbUser.isEmailVerified;
        
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.isEmailVerified = (user as any).isEmailVerified;
      }

      return token;
    },

    async session({ token, session }) {
      if(session.user) {
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.email = token.email;
        (session.user as any).isEmailVerified = token.isEmailVerified;
        session.user.role = token.role;
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  session: {
    strategy: "jwt",
    maxAge: 10*24*60*60
  },
  secret: process.env.AUTH_SECRET
});
