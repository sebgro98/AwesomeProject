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
                    next(error);
                }
            });

            this.router.get('/applications', requireRecruiterAuth, async (req, res) => {
                try {
                    // Fetch all applications from the database
                    const applications = await db.query('SELECT * FROM application');

                    // Format the data as required
                    const formattedApplications = applications.rows.map(application => ({
                        fullName: `${application.name} ${application.surname}`, // Assuming name and surname fields exist in your database
                        status: application.status // Assuming status field exists in your database
                    }));

                    // Send the formatted applications as a response
                    res.json(formattedApplications);
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