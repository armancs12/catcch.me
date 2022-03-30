import NextAuth, { DefaultSession } from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import database from "@server/database";
import sendEmail from "@server/send-email";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {}

  type SessionUser = DefaultSession["user"] & {
    id: string;
  };

  interface Session {
    user: SessionUser;
  }
}

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
    verifyRequest: "/auth/verify",
    // error: "auth/error", // TODO: create error pages
  },
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },

  adapter: PrismaAdapter(database),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        const { host } = new URL(url);

        await sendEmail({
          to: email,
          subject: `Sign in to ${host}`,
          body: `Click this link to finish logging in: ${url}`,
        });
      },
    }),
  ],
});
