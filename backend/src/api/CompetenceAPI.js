const RequestHandler = require('./RequestHandler');
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


        }
        catch (err) {
            console.log(err);
        }
    }
}

// Export the CompetenceAPI class to make it available for other modules
module.exports = CompetenceAPI;