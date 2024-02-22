const ProjectDAO = require('../integration/ProjectDAO');
const Validators = require('../util/Validators');

/**
 * Controller class handles the business logic and interacts with the data access layer.
 * It utilizes ProjectDAO for database operations.
 */
class Controller {

    /**
     * Creates a new instance of Controller and initializes the data access layer.
     * @constructor
     */

    constructor() {
        this.projectDAO = new ProjectDAO();
        this.transactionMgr = this.projectDAO.getTransactionMgr();
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
        await controller.projectDAO.createTables();
        return controller;
    }

    /**
     * Authenticates a user by username and password.
     *
     * @param {string} username The username of the user attempting to log in.
     * @param {string} password The password of the user attempting to log in.
     * @return {PersonDTO} A Promise that resolves with a PersonDTO
     *  representing the logged-in user if the login is successful, or null if no
     *  user is found or the credentials are incorrect.
     *  */
    async login(username, password) {
        return this.transactionMgr.transaction(async (t1) => {
            console.log("do i get here 1")
            return this.projectDAO.findUserByUsernameAndPassword(username, password);
        })
    }

    /**
     * Registers a new user.
     *
     * @param {Object} userData An object containing user registration data.
     * @return {PersonDTO} A Promise that resolves with a PersonDTO
     *  representing the registered user if registration is successful, or null if
     *  there is an issue with the registration process.
     */
    async register(userData) {
        return this.transactionMgr.transaction(async (t1) => {
            // You need to implement the method in ProjectDAO for user registration
            // Assuming createNewUser is a method in ProjectDAO to create a new user
            return this.projectDAO.createNewUser(userData);
        });
    }

    /**
     * Check if a user is logged in based on the provided username.
     * @param {string} username - The username of the user to check.
     * @returns {boolean} True if the user is not found (not logged in); false if the user is found (logged in).
     */
    async isLoggedIn(username) {
        return this.transactionMgr.transaction(async (t1) => {

            const person = await this.projectDAO.findPersonByUsername(username);

            if (person) {
                return false; // User found, indicating logged in
            }

            return true; // User not found, indicating not logged in
        });
    }

    /**
     * Submit a new application
     *
     * @param {Object} application An object containing the application data
     */
    async getApplications(){
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO.getApplications();
        })
    }

    async apply(application) {
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO.createApplication(application);
        });
    }


}

module.exports = Controller;