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
            Validators.isNotEmptyString(username, 'username');
            Validators.isAlnumString(username, 'username');
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
            Validators.isNotEmptyString(userData.username, 'username');
            Validators.isAlnumString(userData.username, 'username');
            Validators.isValidEmail(userData.email);
            Validators.isValidPersonNumber(userData.personNumber);
            Validators.isValidLength(userData.firstName, 'firstName', { min: 2, max: 50 });
            Validators.isValidLength(userData.lastName, 'lastName', { min: 2, max: 50 });
            Validators.isValidDateOfBirth(userData.personNumber);
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
            Validators.isNotEmptyString(username, 'username');
            Validators.isAlnumString(username, 'username');

            const person = await this.projectDAO.findPersonByUsername(username);

            if (person) {
                return false; // User found, indicating logged in
            }

            return true; // User not found, indicating not logged in
        });
    }

    /**
     * Retrieves all applications from the database.
     * This function wraps the database call in a transaction, ensuring that
     * all database operations are performed atomically.
     *
     * @returns {Promise<Array>} A promise that resolves to an array of application objects.
     */
     async getApplications(){
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO.getApplications();
        })
    }

    /**
     * Submit a new application
     *
     * @param {Object} application An object containing the application data
     */
    async apply(application) {
        return this.transactionMgr.transaction(async (t1) => {
            Validators.validateApplication(application);
            return this.projectDAO.createApplication(application);
        });
    }

    async getCompetences(lang) {
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO.getCompetences(lang);
        })
    }

    async getApplicationStatus(lang) {
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO.getApplicationStatus(lang);
        })
    }

    async getRoles() {
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO.getRoles();
        })
    }


}

module.exports = Controller;