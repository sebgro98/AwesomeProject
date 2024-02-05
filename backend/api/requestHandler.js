
const express = require('express');
const controller = require('../controller/controller');

class requestHandler {
    /**
     * Need to add more to constructor and necessary methods
     *
     * **/
    constructor(){
        this.router = express.Router();
    }

    async createControllerInstance() {
        // createController is a static method in controller
        this.controller = await controller.createController();

    }

}

module.exports = requestHandler;