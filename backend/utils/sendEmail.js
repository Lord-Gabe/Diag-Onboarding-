import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (
  email,
  code
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Verify Your Account",

    html: `
      <div style="font-family:sans-serif;">
        <h2>Your Verification Code</h2>
        <h1>${code}</h1>
        <p>This code expires soon.</p>
      </div>
    `,
  });
};