import nodemailer from "nodemailer"
import dns from "dns";
import dotenv from "dotenv"

dotenv.config()

dns.setDefaultResultOrder("ipv4first");

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // Use true for port 465, false for port 587
//     family:4,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });
const transporter = nodemailer.createTransport({
    service: "gmail", // 👈 use service instead of host
    port: 587,
    secure: false, // MUST be false for 587
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password
    },
    tls: {
        family: 4, // Force IPv4
    }
});
// export const sendOtpEmail = async (email, otp) => {
//     await transporter.sendMail({
//         from: `"OTP Verification"<${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Your OTP code",
//         text: "Hello world?", 
//         html: `<h2>Your OTP is :${otp}</h2><p>valid for 5 minutes </p>`, 
//     });
// }


export const sendOtpEmail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"OTP Verification" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP code",
            html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`,
        });

        console.log("Email sent:", info.response);
        return true;

    } catch (error) {
        console.error("Email error:", error);
        throw error;
    }
};
