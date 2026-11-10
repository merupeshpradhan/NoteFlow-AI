import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  //   service: "email",

  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: `Your OTP is ${otp}. This OTP is valid for 5 minutes.`,
  });
};

export default sendEmail;
