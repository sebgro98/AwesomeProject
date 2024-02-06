const ErrorHandler = require('./ErrorHandler');

class ErrorResponseSender extends ErrorHandler {
    constructor() {
        super();
    }

    static get ERROR_RESPONSE_SENDER_PATH() {
        return '/'
    }

    get path() {
        return ErrorResponseSender.ERROR_RESPONSE_SENDER_PATH;
    }

    registerHandler(app) {
        app.use(this.path, (err, req, res, next) => {
            if (res.headersSent) {
                return next(err);
            }
            res.status(500).send({error: 'Operation failed.'})
        })
    }
}

module.exports = ErrorResponseSender;