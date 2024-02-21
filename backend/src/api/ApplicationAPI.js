const RequestHandler = require('./RequestHandler');
const Authorization = require("./auth/Authorization");
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

    get allowedRoleId() {
        return 2;
    }

    /**
     * Handles the registration of API routes for Application-related operations.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            this.router.post('/authorize', async (req, res, next) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleId, req, res)) ) {
                        return;
                    }
                        this.sendHttpResponse(res, 200, "Apply route accessed successfully");

                } catch (error) {
                    // Handle errors properly
                    next(error);
                }
            });


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
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleId, req, res)) ) {
                        return;
                    }

                    const personId = await Authorization.getJWTpersonID(req);
                    const application = req.body;
                    application.personId = personId;
                    const response = this.contr.apply(application);
                    res.send(response);
                }
                catch (error) {
                    res.status(500).json({ message: "Error applying for a position. Please try again later", error: error.message });
                }
            });

            this.router.post('/applications', async (req, res) => {
                try {
                    const response = await this.contr.getApplications();
                    // Send the formatted applications as a response
                    res.send(response);
                } catch (error) {
                    console.error('Error fetching applications:', error);
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