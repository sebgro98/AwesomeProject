const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

let verificationCode; // Declare the variable outside the function

/**
 * getter
 * @returns {string}
 */
function getVarificationCode(){
    return verificationCode;
}

/**
 * Generates a random 5-digit verification code.
 * @returns {string} A 5-digit verification code.
 */
function generateVerificationCode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

/**
 * Sends a verification code to the provided email address.
 *
 * @param {string} personMail - The email address to send the verification code to.
 * @returns {Promise<string>} A Promise that resolves with the sent verification code.
 */
function sendVerificationCode(personMail) {
    if (!verificationCode) {
        // Generate a new verification code only if it doesn't exist
        verificationCode = generateVerificationCode();
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.kth.se',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'sushilkc@kth.se',
        to: personMail,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent successfully');
                resolve(verificationCode);
            }
        });
    });
}

module.exports = {
    sendVerificationCode,
    getVarificationCode,
};
