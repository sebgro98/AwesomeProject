const DAO = require('../integration/DAO');
class controller{
    /**
     * Need to add more to constructor and necessary methods
     *
     * **/
    constructor() {
        this.projectDAO = new DAO();

    }

    // Function to create an instance of Controller
    static async createController() {
        return new controller();
    }


}

module.exports = controller;