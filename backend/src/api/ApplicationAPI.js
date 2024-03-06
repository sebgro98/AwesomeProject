const RequestHandler = require('./RequestHandler');
const Authorization = require("./auth/Authorization");
const mailApi = require('./mail/mailApi');
/**
 * Represents a REST API handler for managing Application-related operations.
 * @extends RequestHandler
 */
class ApplicationAPI extends RequestHandler {

    /**
     * Creates an instance of ApplicationAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for Application-related operations.
     * @returns {string} The API path.
     */
    static get APPLICATION_API_PATH() {
        return '/application'
    }

    /**
     * Gets the path for the current ApplicationAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return ApplicationAPI.APPLICATION_API_PATH;
    }

    // Role IDs for authorization
    get allowedRoleIdApplicant() {
        return 2;
    }
    get allowedRoleIdRecruiter() {
        return 1;
    }

    /**
     * Handles the registration of API routes for Application-related operations.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            /**
             * Express route handler for handling HTTP POST requests to submit a job application.
             *
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @param {NextFunction} next - Express NextFunction for passing control to the next middleware.
             *
             * @throws {Error} Throws an error if there are issues with authorization or if the application submission fails.
             *
             * @returns {void} Responds with an appropriate HTTP status and message based on the success or failure of the application submission.
             */
            this.router.post('/apply', async(req, res, next) => {

                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdApplicant, req, res)) ) {
                        return;
                    }

                    // Retrieve person ID and email from JWT token
                    const personId = await Authorization.getJWTpersonID(req);
                    const personEmail = await Authorization.getJWTpersonMail(req);
                    const application = req.body;

                    // Send email and wait for it to complete
                    const response = this.contr.apply(application);
                    application.personId = personId;
                    mailApi.sendMail(application, personEmail)
                        .then(() => {
                            res.send(response);  // Move the response sending here
                        })
                        .catch((error) => {
                            console.error('Error in email sending process:', error);
                            res.status(500).json({ message: 'Error sending email' });
                        });
                }
                catch (error) {
                    res.status(500).json({ message: "Error applying for a position. Please try again later", error: error.message });
                }
            });

            /**
             * Express route handler for handling HTTP POST requests to retrieve a list of job applications.
             * This route requires the user to be signed in as a recruiter. The response contains an array of application objects.
             *
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @throws {Error} Throws an error if there are issues with authorization or if retrieving applications fails.
             * @returns {void} Responds with an appropriate HTTP status and a JSON array of application objects.
             */
            this.router.post('/applications', async (req, res) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdRecruiter, req, res)) ) {
                        return;
                    }
                    const response = await this.contr.getApplications();
                    res.send(response);
                } catch (error) {
                    console.error('Error fetching applications:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            });

            /**
             * Express route handler for handling HTTP POST requests to retrieve a list of competences.
             * This route requires the user to be signed in as an applicant. The language parameter is sent in the request body.
             * The response contains an array of competence objects in the specified language.
             *
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @throws {Error} Throws an error if there are issues with authorization or if retrieving competences fails.
             * @returns {void} Responds with an appropriate HTTP status and a JSON array of competence objects.
             */
            this.router.post('/retrieveCompetences', async (req, res) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdApplicant, req, res)) ) {
                        return;
                    }
                    const lang = req.body.lang;
                    const response = await this.contr.getCompetences(lang);
                    res.send(response);
                } catch (error) {
                    console.error('Error fetching competences:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            });

            /**
             * Express route handler for handling HTTP POST requests to retrieve a list of application statuses.
             * This route requires the user to be signed in as a recruiter. The language parameter is sent in the request body.
             * The response contains an array of application status objects in the specified language.
             *
             * @param {Request} req - Express Request object containing the HTTP request details.
             * @param {Response} res - Express Response object for sending the HTTP response.
             * @throws {Error} Throws an error if there are issues with authorization or if retrieving application statuses fails.
             * @returns {void} Responds with an appropriate HTTP status and a JSON array of application status objects.
             */
            this.router.post('/retrieveStatus', async (req, res) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdRecruiter, req, res)) ) {
                        return;
                    }
                    const lang = req.body.lang;
                    const response = await this.contr.getApplicationStatus(lang);
                    res.send(response);
                } catch (error) {
                    console.error('Error fetching application status:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

// Export the ApplicationAPI class to make it available for other modules
module.exports = ApplicationAPI;