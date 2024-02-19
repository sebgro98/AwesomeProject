'use strict';
const jwt = require('jsonwebtoken');

class Authorization {

    static get AUTH_COOKIE_NAME() {
        return 'personAuth';
    }

    // Method to set authentication cookie
    // Method to set authentication cookie
    static setAuthCookie(person, res) {
        const httpOnly = { httpOnly: true };
        const sessionCookie = { expires: 0 };


        const cookieOptions = {
            httpOnly: true,
            ...sessionCookie,
        };

        const jwtToken = this.generateToken(person);
        res.cookie(this.AUTH_COOKIE_NAME, jwtToken, cookieOptions);

        console.log('Generated JWT Token:', jwtToken);
        console.log('Cookie Options:', cookieOptions);
        console.log('Response Headers:', res.getHeaders());
    }


    // Method to clear authentication cookie
    static clearAuthCookie(res) {
        res.clearCookie(this.AUTH_COOKIE_NAME);
        res.status(401).json({
            error: 'Unauthorized. Missing authorization token'
        });
    }

    // Method to generate JWT token
   static generateToken(payload, expiresIn = '1h') {
        return (jwt.sign(
            {username: payload.username,
                     role: payload.role_id},
                     process.env.JWT_SECRET,
            {expiresIn: "30 minutes"}))

    }

    // Middleware to check if user is logged in
    static async isSignedIn(contr, req, res) {
        const authCookie = req.cookies.personAuth;

        if(!authCookie) {
            res.status(401).json({
                error: 'Unauthorized. Missing authorization token'
            });
            return false;
        }
            try {
                const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);
                const loggedInUser = await contr.isLoggedIn(JWTPayload.username);

                if (loggedInUser == null) {
                    this.clearAuthCookie(res)
                    return false;
                }
                req.user = loggedInUser;
                return true;
            } catch (err) {
                this.clearAuthCookie(res)
                return false;
            }
        }



    // Method to get JWT username
    static async getJWTUsername(req) {
        const authCookie = req.cookies.personAuth;
        const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);

        return JWTPayload.username;
    }
}

module.exports = Authorization;