import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //1. create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });
  //2. create mail options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  //3. send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
