/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates a person number.
 * @param {string} personNumber - The person number to validate.
 * @returns {boolean} True if the person number is valid, false otherwise.
 */
function isValidPersonNumber(personNumber) {
    const personNumberRegex = /^\d{8}-\d{4}$/;
    return personNumberRegex.test(personNumber);
}

// Add other validation functions as needed

module.exports = {
    isValidEmail,
    isValidPersonNumber,
    // Add other validation functions here
};