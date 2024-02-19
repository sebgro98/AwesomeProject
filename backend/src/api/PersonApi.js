const RequestHandler = require('./RequestHandler');
const Authorization = require('./auth/Authorization');
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
     * Handles the registration of API routes for Person-related operations like logín and registering a person.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            // Add a middleware to check if the user is signed in before handling the /apply route
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

            this.router.post(
                '/login',
                async (req, res, next) => {
                    const { username, password } = req.body;
                    try {
                        const person = await this.contr.login(username, password);
                        if (person) {
                            Authorization.setAuthCookie(person, res);
                            this.sendHttpResponse(res, 200, "Login successful");
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