const express = require('express');
const UserController = require('../controller/Controller');

class RequestHandler {
    constructor() {
        this.router = express.Router();
    }

    static get URL_PREFIX() {
        return 'http://';
    }

    async retrieveController() {
        this.contr = await UserController.createController();
    }

    sendHttpResponse(res, status, body) {
        if (body === undefined) {
            res.status(status).end();
        }
        let errorSucc = undefined;
        if (status < 400) errorSucc = 'success';
        else errorSucc = 'error';
        res.status(status).json({[errorSucc]: body});
    }
}

module.exports = RequestHandler;
