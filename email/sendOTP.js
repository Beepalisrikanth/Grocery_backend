import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // Use true for port 465, false for port 587
    family:4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendOtpEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"OTP Verification"<${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP code",
        text: "Hello world?", // Plain-text version of the message
        html: `<h2>Your OTP is :${otp}</h2><p>valid for 5 minutes </p>`, // HTML version of the message
    });
}

