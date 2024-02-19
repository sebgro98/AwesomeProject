const assert = require('assert').strict;
const validator = require('validator');

class Validators {

    static isString(val, name) {
        assert.equal(typeof val, 'string', `${name} must be a string`);
    }
    static isAlnumString(value, varName) {
        Validators.isString(value, varName);
        assert(
            validator.isAlphanumeric(value),
            `${varName} may only contain letters and numbers.`
        );
    }

    static isNotEmptyString(val, name) {
        Validators.isString(val, name);
        assert(!validator.isEmpty(val), `${name} cannot be an empty string`);
    }

}

module.exports = Validators;