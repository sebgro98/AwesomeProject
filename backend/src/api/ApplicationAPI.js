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

    /**
     * Handles the registration of API routes for Application-related operations.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            this.router.get('/apply', async (req, res, next) => {
                console.log("req2...........", req)
                console.log("res2...........", res)
                try {
                    const isLoggedIn = await Authorization.isSignedIn(this.contr, 1, req, res);
                    console.log("req1...........", req)
                    console.log("res1...........", res)
                    console.log("In personAPI...........", isLoggedIn)
                    if (isLoggedIn) {
                        // User is logged in, proceed with the /apply logic
                        // ...

                        // Example: Send a response indicating successful processing
                        this.sendHttpResponse(res, 200, "Apply route accessed successfully");
                    } else {
                        // User is not logged in, handle accordingly
                        this.sendHttpResponse(res, 401, "Unauthorized. User not logged in");
                    }
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

// Export the ApplicationAPI class to make it available for other modules
module.exports = ApplicationAPI;