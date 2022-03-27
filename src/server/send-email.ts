import nodemailer from "nodemailer";

const isProduction = process.env.NODE_ENV === "production";
const emailFrom = process.env.EMAIL_FROM;
const emailServer = process.env.EMAIL_SERVER;

type Options = {
  to: string;
  subject?: string;
  body: string;
};

function makeSendEmail() {
  const transport = nodemailer.createTransport(emailServer, {
    secure: true,
    from: emailFrom,
  });

  return async ({ to, subject, body }: Options) => {
    await transport.sendMail({
      to,
      subject,
      html: body,
      text: body,
      from: emailFrom,
    });
  };
}

function makeFakeSendEmail() {
  return async ({ to, subject, body }: Options) => {
    console.log({ to, subject, body });
  };
}

const sendEmail = isProduction ? makeSendEmail() : makeFakeSendEmail();
export default sendEmail;
