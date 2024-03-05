const assert = require('assert').strict;
const validator = require('validator');

class Validators {

    /**
     * Validates an email address.
     *
     * @param {string} email - The email address to validate.
     */
    static isValidEmail(email) {
        Validators.isString(email, 'email');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        assert(
            emailRegex.test(email),
            'Invalid email address format.'
        );
    }

    /**
     * Validates a person number.
     *
     * @param {string} personNumber - The person number to validate.
     */
    static isValidPersonNumber(personNumber) {
        Validators.isString(personNumber, 'personNumber');

        const personNumberRegex = /^\d{8}-\d{4}$/;
        assert(
            personNumberRegex.test(personNumber),
            'Invalid person number format. It should be in the format YYYYMMDD-XXXX.'
        );
    }

    /**
     * Checks if the given value is a string.
     *
     * @param {any} val - The value to be checked.
     * @param {string} name - The name of the variable (used in the error message if the check fails).
     */
    static isString(val, name) {
        assert.equal(typeof val, 'string', `${name} must be a string`);
    }


    /**
     * Checks if the given value is an alphanumeric string.
     *
     * @param {string} value - The string value to be checked.
     * @param {string} varName - The name of the variable (used in the error message if the check fails).
     */
    static isAlnumString(value, varName) {
        Validators.isString(value, varName);
        assert(
            validator.isAlphanumeric(value),
            `${varName} may only contain letters and numbers.`
        );
    }

    /**
     * Checks if the given value is a non-empty string.
     *
     * @param {string} val - The string value to be checked.
     * @param {string} name - The name of the variable (used in the error message if the check fails).
     */
    static isNotEmptyString(val, name) {
        Validators.isString(val, name);
        assert(!validator.isEmpty(val), `${name} cannot be an empty string`);
    }

    /**
     * Checks if the length of the given string is within the specified range.
     *
     * @param {string} value - The string value to be checked.
     * @param {string} varName - The name of the variable (used in the error message if the check fails).
     * @param {object} options - The options object with min and max properties specifying the length range.
     */
    static isValidLength(value, varName, { min, max }) {
        Validators.isString(value, varName);
        assert(
            value.length >= min && value.length <= max,
            `${varName} must have a length between ${min} and ${max} characters.`
        );
    }

    /**
     * Validates the date of birth based on the person number.
     *
     * @param {string} personNumber - The person number containing the date of birth.
     */
    static isValidDateOfBirth(personNumber) {
        Validators.isString(personNumber, 'personNumber');

        // Extract the date of birth from the person number (assuming YYYYMMDD format)
        const year = parseInt(personNumber.substr(0, 4), 10);
        const month = parseInt(personNumber.substr(4, 2), 10) - 1; // Month is zero-based in JavaScript
        const day = parseInt(personNumber.substr(6, 2), 10);

        // Create a Date object and check if it's a valid date
        const dateOfBirth = new Date(year, month, day);

        if (
            isNaN(dateOfBirth.getFullYear()) ||
            dateOfBirth.getMonth() !== month ||
            dateOfBirth.getDate() !== day
        ) {
            throw new Error('Invalid date of birth in the person number.');
        }
    }

    /**
     * Checks if the value is a non-empty string.
     *
     * @param {string} value - The string value to be checked.
     * @param {string} varName - The name of the variable (used in the error message if the check fails).
     */
    static isString(value, varName) {
        assert(
            typeof value === 'string' && value.trim().length > 0,
            `${varName} must be a non-empty string.`
        );
    }

}

module.exports = Validators;