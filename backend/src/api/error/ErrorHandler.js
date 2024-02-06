const UserController = require('../../controller/Controller');

class ErrorHandler {

    async retrieveController() {
        this.contr = await UserController.createController();
    }
}

module.exports = ErrorHandler;

