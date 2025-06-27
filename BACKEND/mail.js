const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure you are loading environment variables

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS,  // Your email password or App Password
    },
});

// Function to send email
const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions)
        .then(() => console.log("Email sent successfully!"))
        .catch(error => {
            console.error("Error sending email:", error);
            throw error; // Propagate error for handling in route
        });
};

module.exports = sendMail;
