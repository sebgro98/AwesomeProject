const RequestHandler = require('./RequestHandler');
const Authorization = require("./auth/Authorization");
/**
 * Represents a REST API handler for managing Competence-related operations.
 * @extends RequestHandler
 */
class CompetenceAPI extends RequestHandler {
    /**
     * Creates an instance of CompetenceAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for Competence-related operations.
     * @returns {string} The API path.
     */
    static get COMPETENCE_API_PATH() {
        return '/competence'
    }

    /**
     * Gets the path for the current CompetenceAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return CompetenceAPI.COMPETENCE_API_PATH;
    }

    /**
     * Handles the registration of API routes for Competence-related operations.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            this.router.post('/retrieve', async (req, res) => {
                try {
                    if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleIdApplicant, req, res)) ) {
                        return;
                    }

                    const response = await this.contr.getCompetences();
                    // Send the formatted competences as a response
                    res.send(response);
                } catch (error) {
                    console.error('Error fetching competences:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            });

        }
        catch (err) {
            console.log(err);
        }
    }
}

// Export the CompetenceAPI class to make it available for other modules
module.exports = CompetenceAPI;