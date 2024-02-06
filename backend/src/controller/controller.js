const ProjectDAO2 = require('../integration/ProjectDAO');

/**
 * Controller class handles the business logic and interacts with the data access layer.
 * It utilizes ProjectDAO2 for database operations.
 */
class Controller {

    /**
     * Creates a new instance of Controller and initializes the data access layer.
     * @constructor
     */
    constructor() {
        this.projectDAO2 = new ProjectDAO2();
        this.transactionMgr = this.projectDAO2.getTransactionMgr();
    }

    /**
     * Creates a new instance of Controller asynchronously and initializes the data access layer.
     * Optionally, it synchronizes database models by calling createTables().
     * @static
     * @async
     * @return {Controller} A new instance of Controller.
     */
    static async createController() {
        const controller = new Controller();
        await controller.projectDAO2.createTables();
        return controller;
    }

    /**
     * Authenticates a user by username and password.
     * @param {string} username The username of the user.
     * @param {string} password The password of the user.
     * @return {boolean} True if authentication succeeds, false otherwise.
     * @throws {Error} If an error occurs during database operation.
     */
    async login(username, password) {
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO2.findUserByUsernameAndPassword(username, password);
        })
    }


}

module.exports = Controller;