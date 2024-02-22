const assert = require('assert').strict;
const validator = require('validator');

class Validators {

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

}

module.exports = Validators;