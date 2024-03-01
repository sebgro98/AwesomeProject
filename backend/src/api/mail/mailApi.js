const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' }); // Adjust the path accordingly

/**
 * Sends an email with the application details to the provided email address.
 *
 * @param {object} application - The application details.
 * @param {string} personMail - The email address to send the email to.
 * @returns {Promise<object>} A Promise that resolves with the information about the sent email.
 */
function sendMail(application, personMail) {
    // Replace with your SMTP configuration
    const transporter = nodemailer.createTransport({
        host: 'smtp.kth.se',
        port: 587,
        secure: false, // STARTTLS is used, so set to false
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Extract competence profile and availability information
    const competenceProfileText = application.competenceProfile.map(cp => `Competence: ${cp.competence}, Experience: ${cp.experience}`).join('\n');
    const availabilityText = application.availability.map(av => `Start Date: ${av.startDate}, End Date: ${av.endDate}`).join('\n');

    // Construct email text
    const emailText = `Hello,\n\nYour application has been submitted successfully.\nYour competence profile:\n${competenceProfileText}\n\nYour availability period:\n${availabilityText}\n\nThank you for applying.`;

    // Replace with your email content
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: personMail,
        subject: 'Application Submitted',
        text: `${emailText}`,
    };

    // Use a Promise to handle the asynchronous sendMail function
    return new Promise((resolve, reject) => {
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent successfully');
                resolve(info);
            }
        });
    });
}

module.exports = {
    sendMail,
};
