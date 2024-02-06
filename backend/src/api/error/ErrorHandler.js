const UserController = require('../../controller/controller');

class ErrorHandler {

    async retrieveController() {
        this.contr = await UserController.createController();
    }
}

module.exports = ErrorHandler;

