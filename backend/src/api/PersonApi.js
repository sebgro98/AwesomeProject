const RequestHandler = require('./RequestHandler');

class PersonAPI extends RequestHandler {
    constructor() {
        super();
    }

    static get PERSON_API_PATH() {
        return '/person'
    }

    get path() {
        return PersonAPI.PERSON_API_PATH;
    }

    async registerHandler() {
        try {
            await this.retrieveController();

            this.router.post(
                '/login',
                async(req, res, next) => {
                    const { username, password } = req.body;
                    try {
                        const person = await this.contr.login(username, password);
                        if (person) {
                            this.sendHttpResponse(res, 200, "Login successful");
                        }
                        else {
                            this.sendHttpResponse(res, 401, "Login failed");
                        }
                    }
                    catch (err) {
                        next(err);
                    }
                }
            )
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = PersonAPI;
module.exports = PersonAPI;