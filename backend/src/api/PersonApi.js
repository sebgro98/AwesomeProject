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
                    try {
                        const person = await this.contr.login(req.body.username, req.body.password);
                        if (person == null) {
                            this.sendHttpResponse(res, 401, "Login failed");
                            return;
                        }
                        this.sendHttpResponse(res, 204);

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