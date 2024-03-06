const RequestHandler = require('./RequestHandler');
const Authorization = require('./auth/Authorization');
const MailVerify = require('./mail/MailVerify');

/**
 * Represents a REST API handler for managing Person-related operations.
 * @extends RequestHandler
 */
class PersonAPI extends RequestHandler {
    /**
     * Creates an instance of PersonAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for Person-related operations.
     * @returns {string} The API path.
     */
    static get PERSON_API_PATH() {
        return '/person'
    }

    /**
     * Gets the path for the current PersonAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return PersonAPI.PERSON_API_PATH;
    }

    // Role IDs for authorization
    get allowedRoleIdApplicant() {
        return 2;
    }
    get allowedRoleIdRecruiter() {
        return 1;
    }

    /**
     * Handles the registration of API routes for Person-related operations like logín and registering a person.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            /**
             * Express route handler for handling HTTP POST requests to log in a person.
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @param {NextFunction} next - Express NextFunction for passing control to the next middleware.
             *
             * @throws {Error} Throws an error if there are issues with login or if the login fails.
             *
             * @returns {void} Responds with an appropriate HTTP status and a JSON object containing person details.
             */

            this.router.post(
                '/login',
                async (req, res, next) => {
                    const { username, password } = req.body;
                    try {
                        const person = await this.contr.login(username, password);

                        if (person) {
                            // Retrieve the correct role name depending on the role_id
                            const roles = await this.contr.getRoles();
                            const roleName = roles.find(role => role.role_id === person.role_id).name || "Unknown";

                            // Assuming person has properties like name, id, application_status_id, and role_id
                            const responseData = {
                                name: person.name,
                                id: person.person_id,
                                application_status_id: person.application_status_id,
                                role_id: person.role_id,
                                personMail: person.email,
                                role: roleName
                            };

                            Authorization.setAuthCookie(person, res);
                            this.sendHttpResponse(res, 200, responseData);
                        } else {
                            this.sendHttpResponse(res, 401, "Login failed");
                        }
                    } catch (err) {
                        next(err);
                    }
                }
            );

            /**
             * Express route handler for handling HTTP POST requests to send a verification code for a person.
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @param {NextFunction} next - Express NextFunction for passing control to the next middleware.
             *
             * @throws {Error} Throws an error if there are issues with sending the verification code.
             *
             * @returns {void} Responds with an appropriate HTTP status and a message indicating the success or failure of the verification code sending.
             */
            this.router.post(
                '/sendVerification',
                async (req, res, next) => {
                    const { formData } = req.body;
                    try {

                        const verificationCode = MailVerify.sendVerificationCode(formData.email); //email address is in formData.personMail
                        // Handle successful verification code sending
                        res.status(200).json({ message: "Verification code sent successfully" });
                    } catch (error) {
                        console.error('Error sending verification code:', error);
                        res.status(500).json({ message: "Error sending verification code. Please try again later", error: error.message });
                    }
                }
            );

            /**
             * Express route handler for handling HTTP POST requests to verify a verification code for a person.
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @param {NextFunction} next - Express NextFunction for passing control to the next middleware.
             *
             * @throws {Error} Throws an error if there are issues with verifying the verification code.
             *
             * @returns {void} Responds with an appropriate HTTP status and a message indicating the success or failure of the verification code verification.
             */
            this.router.post(
                '/verifyVerificationCode',
                async (req, res, next) => {
                    const { formData, verificationCode } = req.body;
                    try {
                        const ourVerificationCode = MailVerify.getVarificationCode();
                        if (verificationCode === ourVerificationCode ) {
                            const response = await this.contr.register(formData);
                            res.status(200).json({ message: "Verification code matched", response });
                        } else {
                            res.status(400).json({ message: "Verification code mismatch" });
                        }
                    }catch (error) {
                        console.error('Error verifying verification code:', error);

                        // Extract specific error information
                        const errorMsg = {
                            message: error.message,
                            error: error,
                            projectDAOError: error.jse_info && error.jse_info.ProjectDAO ? error.jse_info.ProjectDAO : null,
                            customError: (error.jse_cause ? error.jse_cause.toString() : ''), // Include the specific error information
                        };

                        res.status(500).json(errorMsg);
                    }
                }
            );

            /**
             * Express route handler for handling HTTP POST requests to authorize an applicant.
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @param {NextFunction} next - Express NextFunction for passing control to the next middleware.
             *
             * @throws {Error} Throws an error if there are issues with authorization.
             *
             * @returns {void} Responds with an appropriate HTTP status and a message indicating the success or failure of the authorization.
             */
            this.router.post('/authorizeApplicant', async (req, res, next) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdApplicant, req, res)) ) {
                        return;
                    }
                    this.sendHttpResponse(res, 200, "Applicant successfully authorized");

                } catch (error) {
                    // Handle errors properly
                    next(error);
                }
            });

            /**
             * Express route handler for handling HTTP POST requests to authorize a recruiter.
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @param {NextFunction} next - Express NextFunction for passing control to the next middleware.
             *
             * @throws {Error} Throws an error if there are issues with authorization.
             *
             * @returns {void} Responds with an appropriate HTTP status and a message indicating the success or failure of the authorization.
             */
            this.router.post('/authorizeRecruiter', async (req, res, next) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdRecruiter, req, res)) ) {
                        return;
                    }
                    this.sendHttpResponse(res, 200, "Recruiter successfully authorized");

                } catch (error) {
                    // Handle errors properly
                    next(error);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

// Export the PersonAPI class to make it available for other modules
module.exports = PersonAPI;