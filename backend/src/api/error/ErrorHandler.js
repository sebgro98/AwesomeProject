const UserController = require('../../controller/Controller');
/**
 * Base class for handling errors and retrieving the user controller.
 */
class ErrorHandler {

    /**
     * Retrieves the user controller asynchronously and assigns it to the instance variable `contr`.
     * @throws {Error} Throws an error if there is an issue retrieving the controller.
     */
    async retrieveController() {
        this.contr = await UserController.createController();
    }
}

// Export the ErrorHandler class to make it available for other modules
module.exports = ErrorHandler;

