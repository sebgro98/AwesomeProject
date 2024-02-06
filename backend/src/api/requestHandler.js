const express = require('express');
const UserController = require('../controller/controller');

class RequestHandler {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    static get URL_PREFIX() {
        return 'http://';
    }

    async retrieveController() {
        this.contr = await UserController.createController();
    }

    sendHttpResponse(res, status, body) {
        if (body == undefined) {
            res.status(status).end();
        }
        let errorSucc = undefined;
        if (status < 400) errorSucc = 'success';
        else errorSucc = 'error';
        res.status(status).json({[errorSucc]: body});
    }



    initializeRoutes() {
        const userController = new UserController();

        this.router.post('/login', async (req, res) => {
            const { username, password } = req.body;
            try {
                const result = await userController.login(username, password);
                if (result) {
                    res.status(200).json({ message: 'Login successful' });
                } else {
                    res.status(401).json({ message: 'Login failed' });
                }
            } catch (error) {
                console.error("Login error:", error); // Detailed error logging
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
    }
}

module.exports = RequestHandler;
