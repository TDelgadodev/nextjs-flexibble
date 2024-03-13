import { User, getServerSession } from "next-auth";
import jsonwebtoken from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SessionInterface, UserProfile } from "@/common.types";
import jwt from "jsonwebtoken";
import { createUser, getUser, getUserByEmail } from "./actions";
import { ObjectId } from "mongodb";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jwt.sign(
        {
          ...token,
          sub: token?.sub?.toString(),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      
      const decodedToken = jwt.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async session({ session, token }) {

      const email = session?.user?.email as string;

      try {
        const data = (await getUserByEmail(email)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log(error);
      }

      return session;
    },
    async signIn({ user }) {
      try {
        
        let userExists = await getUser(user?.email as string);

        if (!userExists) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
          userExists = await getUser(user.email as string);
        }        

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
