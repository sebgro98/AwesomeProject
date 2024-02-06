const PersonAPI = require ('./PersonAPI');
const ErrorResponseSender = require('./error/ErrorResponseSender')

class RequestHandlerLoader {

    constructor() {
        this.reqHandlers = [];
        this.errorHandlers = [];
    }

    addRequestHandler(reqHandler) {
        this.reqHandlers.push(reqHandler);
    }

    addErrorHandler(errorHandler) {
        this.errorHandlers.push(errorHandler);
    }

    loadReqHandlers(app) {
        this.reqHandlers.forEach((reqHandler) => {
            reqHandler.registerHandler();
            app.use(reqHandler.path, reqHandler.router);
        })
    }

    loadErrorHandlers(app) {
        this.errorHandlers.forEach((errorHandler) => {
            errorHandler.registerHandler(app);
        })
    }
}

const loader = new RequestHandlerLoader();
loader.addRequestHandler(new PersonAPI());
loader.addErrorHandler(new ErrorResponseSender());

module.exports = loader;