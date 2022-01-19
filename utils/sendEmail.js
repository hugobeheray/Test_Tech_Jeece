import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USERMAIL,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export { sendEmail };
