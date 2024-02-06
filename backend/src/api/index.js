const PersonAPI = require ('./PersonAPI');

class RequestHandlerLoader {

    constructor() {
        this.reqHandlers = [];
    }

    addRequestHandler(reqhHandler) {
        this.reqHandlers.push(reqhHandler);
    }

    loadHandlers(app) {
        this.reqHandlers.forEach((reqHandler) => {
            reqHandler.registerHandler();
            app.use(reqHandler.path, reqHandler.router);
        })
    }
}

const loader = new RequestHandlerLoader();
loader.addRequestHandler(new PersonAPI());

module.exports = loader;