import {   Account, NextAuthOptions, Session, User as UserType } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from './lib/db';
import bcrypt from 'bcryptjs';
import User from './models/User';
import { JWT } from 'next-auth/jwt';



export const authOptions:NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: UserType }):Promise<JWT>  {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }):Promise<Session> {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    },

    async signIn( 
      {user, account}: {
      user: UserType; // Use the Prisma User type here
      account: Account | null;
    }):Promise<boolean> {
      try {
        await connectDB();

        if (account?.provider === "credentials") {
          // ✅ User already authenticated via credentials in `authorize()`
          return true;
        }

        if (account?.provider === "google" || account?.provider === "github") {
          // ✅ Check if user already exists in the database
          const existingUser = await User.findOne({ email: user.email });
    
          if (!existingUser) {
            // ✅ Create a new user in MongoDB
            const newUser = new User({
              email: user.email,
              name: user.name || "Dude",
              image: user.image || "",
              password: "", // OAuth users don't have passwords
              role: "user",
            });
    
            await newUser.save();
          }
        }
        else if (!user.email) {
          throw new Error("Email not available from provider");
        }

        return true;
      } catch (error) {
        console.error("Error while creating user:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}