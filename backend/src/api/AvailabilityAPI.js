const RequestHandler = require('./RequestHandler');
/**
 * Represents a REST API handler for managing Availability-related operations.
 * @extends RequestHandler
 */
class AvailabilityAPI extends RequestHandler {
    /**
     * Creates an instance of AvailabilityAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for Availability-related operations.
     * @returns {string} The API path.
     */
    static get AVAILABILITY_API_PATH() {
        return '/availability'
    }

    /**
     * Gets the path for the current AvailabilityAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return AvailabilityAPI.AVAILABILITY_API_PATH;
    }

    /**
     * Handles the registration of API routes for Availability-related operations.
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

// Export the AvailabilityAPI class to make it available for other modules
module.exports = AvailabilityAPI;