const RequestHandler = require('./RequestHandler');
/**
 * Represents a REST API handler for managing CompetenceProfile-related operations.
 * @extends RequestHandler
 */
class CompetenceProfileAPI extends RequestHandler {
    /**
     * Creates an instance of CompetenceProfileAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for CompetenceProfile-related operations.
     * @returns {string} The API path.
     */
    static get COMPETENCE_PROFILE_API_PATH() {
        return '/competenceProfile'
    }

    /**
     * Gets the path for the current CompetenceProfileAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return CompetenceProfileAPI.COMPETENCE_PROFILE_API_PATH;
    }

    /**
     * Handles the registration of API routes for CompetenceProfile-related operations.
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

// Export the CompetenceProfileAPI class to make it available for other modules
module.exports = CompetenceProfileAPI;