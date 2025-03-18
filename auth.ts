import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      // console.log({ sessionToken: token });
      return session;
    },
    async jwt({ token }) {
      // console.log({ token });
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
});
