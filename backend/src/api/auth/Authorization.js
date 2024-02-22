//can help catch common coding bloopers and make your code more robust.
'use strict';

//  provides functions for generating and verifying JSON Web Tokens
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
     * Cookie options, httpOnly will ensure that the cookie is only accessible through the webserver
     * The sessionCookie option will expire when the browsing session ends
     *
     * res.cookie will set the cookie with the name personAuth together will the payload and the cookieOptions
     *
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
     * The payload will take information about the object payload which is a person and use that information
     * to create a token together with the expiresIn which is 1 hour.
     * @param {Object} payload - The payload containing the person object information.
     * @param {string} expiresIn - The expiration time for the token.
     * @returns {string} The generated JWT token.
     */
    static generateToken(payload, expiresIn = '1h') {
        return jwt.sign(
            { username: payload.username, id: payload.person_id, role: payload.role_id },
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
            // send the cookie payload to check if this user is logged in or not. or if it's even the same user.
            const loggedInUser = await contr.isLoggedIn(JWTPayload.username);

            if (loggedInUser == null) {
                this.clearAuthCookie(res);
                return false;
            }
            /* if user is not logged in then we want to clear the cookie that was there before, or if
                the role id for the user logged in is not the same as the allowed one.
            * */
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

    static async getJWTpersonID(req) {
        const authCookie = req.cookies.personAuth;
        const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);

        return JWTPayload.id;
    }
}

module.exports = Authorization;
