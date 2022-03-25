import NextAuth from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import database from "@server/database";
import sendEmail from "@server/send-email";

export default NextAuth({
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
