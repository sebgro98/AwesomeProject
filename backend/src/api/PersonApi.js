const RequestHandler = require('./RequestHandler');
/**
 * Represents a REST API handler for managing Person-related operations.
 * @extends RequestHandler
 */
class PersonAPI extends RequestHandler {
    /**
     * Creates an instance of PersonAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for Person-related operations.
     * @returns {string} The API path.
     */
    static get PERSON_API_PATH() {
        return '/person'
    }

    /**
     * Gets the path for the current PersonAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return PersonAPI.PERSON_API_PATH;
    }

    /**
     * Handles the registration of API routes for Person-related operations.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            this.router.post(
                '/login',
                async (req, res, next) => {
                    const { username, password } = req.body;
                    try {
                        const person = await this.contr.login(username, password);
                        if (person) {
                            // If login is successful, set user data in session
                            req.session.user = {
                                password: person.password,
                                username: person.username,
                            };
                            const mommy = req.session.user.username;
                            res.send(`Welcome, ${mommy}!`);
                            //this.sendHttpResponse(res, 200, "Login successful");
                        } else {
                            this.sendHttpResponse(res, 401, "Login failed");
                        }
                    } catch (err) {
                        next(err);
                    }
                }
            );

            // New registration route for when a user signs up to our application
            this.router.post(
                '/register',
                async (req, res, next) => {
                    const { formData } = req.body;
                    try {
                        // Assuming `this.contr.register` is a method to handle registration
                        const response = await this.contr.register(formData);
                        // Handle successful registration
                        res.send(response.data);
                    } catch (error) {
                        // Handle failed registration
                        this.sendHttpResponse(res, 400, "Registration failed");
                    }
                }
            );

        }
        catch (err) {
            console.log(err);
        }
    }
}

// Export the PersonAPI class to make it available for other modules
module.exports = PersonAPI;