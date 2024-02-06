const PersonAPI = require ('./PersonAPI');
const ErrorResponseSender = require('./error/ErrorResponseSender')

/**
 * RequestHandlerLoader class loads request handlers and error handlers into an Express application.
 * It provides methods to add request handlers and error handlers, and to load them into an Express app.
 * It also instantiates and adds specific request handlers and error handlers upon creation.
 */
class RequestHandlerLoader {

    /**
     * Creates a new instance of RequestHandlerLoader with empty arrays for request handlers and error handlers.
     * @constructor
     */
    constructor() {
        this.reqHandlers = [];
        this.errorHandlers = [];
    }

    /**
     * Adds a request handler to the loader.
     * @param {Object} reqHandler The request handler object to add.
     */
    addRequestHandler(reqHandler) {
        this.reqHandlers.push(reqHandler);
    }

    /**
     * Adds an error handler to the loader.
     * @param {Object} errorHandler The error handler object to add.
     */
    addErrorHandler(errorHandler) {
        this.errorHandlers.push(errorHandler);
    }

    /**
     * Loads the registered request handlers into the Express application.
     * @param {Object} app The Express application to load request handlers into.
     */
    loadReqHandlers(app) {
        this.reqHandlers.forEach((reqHandler) => {
            reqHandler.registerHandler();
            app.use(reqHandler.path, reqHandler.router);
        })
    }

    /**
     * Loads the registered error handlers into the Express application.
     * @param {Object} app The Express application to load error handlers into.
     */
    loadErrorHandlers(app) {
        this.errorHandlers.forEach((errorHandler) => {
            errorHandler.registerHandler(app);
        })
    }
}

// Instantiate and configure the RequestHandlerLoader with specific request and error handlers
const loader = new RequestHandlerLoader();
loader.addRequestHandler(new PersonAPI());
loader.addErrorHandler(new ErrorResponseSender());

module.exports = loader;