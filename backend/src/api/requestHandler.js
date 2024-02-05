const express = require('express');
const UserController = require('../controller/controller');

class RequestHandler {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
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
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // Add more routes as needed
    }
}

module.exports = RequestHandler;
