const ErrorHandler = require('./ErrorHandler');
/**
 * Represents a class responsible for sending error responses.
 * @extends ErrorHandler
 */
class ErrorResponseSender extends ErrorHandler {
    /**
     * Creates an instance of ErrorResponseSender.
     */
    constructor() {
        super();
    }

    /**
     * Returns the path associated with the ErrorResponseSender.
     * @returns {string} The path for error response handling.
     */
    static get ERROR_RESPONSE_SENDER_PATH() {
        return '/'
    }

    /**
     * Gets the path for the current ErrorResponseSender instance.
     * @returns {string} The path for the current instance.
     */
    get path() {
        return ErrorResponseSender.ERROR_RESPONSE_SENDER_PATH;
    }

    /**
     * Registers the error response handling middleware for the provided Express app.
     * @param {express.Application} app - The Express app to register the error handling middleware.
     */
    registerHandler(app) {
        app.use(this.path, (err, req, res, next) => {
            if (res.headersSent) {
                return next(err);
            }
            res.status(500).send({error: 'Operation failed.'})
        })
    }
}

// Export the ErrorResponseSender class to make it available for other modules
module.exports = ErrorResponseSender;