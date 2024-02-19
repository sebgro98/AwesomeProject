'use strict';
const jwt = require('jsonwebtoken');

/**
 * Helper class for handling user authorization with JWT.
 */
class Authorization {

    /**
     * The name of the authentication cookie.
     * @type {string}
     */
    static get AUTH_COOKIE_NAME() {
        return 'personAuth';
    }

    /**
     * Set the authentication cookie for a given person.
     * @param {Object} person - The user object containing username and role information.
     * @param {Object} res - The Express response object.
     */
    static setAuthCookie(person, res) {
        const sessionCookie = { expires: 0 };

        const cookieOptions = {
            httpOnly: true,
            ...sessionCookie,
        };

        const jwtToken = this.generateToken(person);
        res.cookie(this.AUTH_COOKIE_NAME, jwtToken, cookieOptions);
    }

    /**
     * Clear the authentication cookie and send an unauthorized response.
     * @param {Object} res - The Express response object.
     */
    static clearAuthCookie(res) {
        res.clearCookie(this.AUTH_COOKIE_NAME);
        res.status(401).json({
            error: 'Unauthorized. Missing authorization token'
        });
    }

    /**
     * Generate a JWT token for a given payload.
     * @param {Object} payload - The payload containing username and role information.
     * @param {string} expiresIn - The expiration time for the token.
     * @returns {string} The generated JWT token.
     */
    static generateToken(payload, expiresIn = '1h') {
        return jwt.sign(
            { username: payload.username, role: payload.role_id },
            process.env.JWT_SECRET,
            { expiresIn: expiresIn }
        );
    }

    /**
     * Middleware to check if a user is logged in and has the allowed role.
     * @param {Object} contr - The controller object for handling user-related logic.
     * @param {number} allowedRoleId - The allowed role ID.
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {boolean} True if the user is signed in and has the allowed role; false otherwise.
     */
    static async isSignedIn(contr, allowedRoleId, req, res) {
        const authCookie = req.cookies.personAuth;
        if (!authCookie) {
            res.status(401).json({
                error: 'Unauthorized. Missing authorization token'
            });
            return false;
        }

        try {
            const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);
            const loggedInUser = await contr.isLoggedIn(JWTPayload.username);

            if (loggedInUser == null) {
                this.clearAuthCookie(res);
                return false;
            }

            const roleId = JWTPayload.role;
            if (loggedInUser || (roleId !== allowedRoleId)) {
                this.clearAuthCookie(res);
                return false;
            }

            req.user = loggedInUser;
            return true;
        } catch (err) {
            this.clearAuthCookie(res);
            return false;
        }
    }

    /**
     * Get the username from the JWT in the request cookie.
     * @param {Object} req - The Express request object.
     * @returns {string} The username extracted from the JWT.
     */
    static async getJWTUsername(req) {
        const authCookie = req.cookies.personAuth;
        const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);

        return JWTPayload.username;
    }
}

module.exports = Authorization;
