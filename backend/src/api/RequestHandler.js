const express = require('express');
const UserController = require('../controller/Controller');

/**
 * RequestHandler class manages HTTP requests and responses.
 */
class RequestHandler {

    /**
     * Constructs a new RequestHandler.
     * Initializes an Express router.
     * @constructor3
     */
    constructor() {
        this.router = express.Router();
    }

    /**
     * Retrieves the URL prefix used by the RequestHandler.
     * @static
     * @returns {string} The URL prefix.
     */
    static get URL_PREFIX() {
        return 'http://';
    }

    /**
     * Asynchronously retrieves an instance of the UserController.
     * @async
     */
    async retrieveController() {
        this.contr = await UserController.createController();
    }

    /**
     * Sends an HTTP response with the specified status code and body.
     * If the body is undefined, only the status code is sent.
     * @param {Object} res - The Express response object.
     * @param {number} status - The HTTP status code.
     * @param {Object} body - The response body.
     */
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
