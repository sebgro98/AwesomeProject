const ProjectDAO2 = require('../integration/ProjectDAO');

class Controller {
    constructor() {
        this.projectDAO2 = new ProjectDAO2();
        this.transactionMgr = this.projectDAO2.getTransactionMgr();
    }

    static async createController() {
        const controller = new Controller();
        await controller.projectDAO2.createTables();
        return controller;
    }

    async login(username, password) {
        return this.transactionMgr.transaction(async (t1) => {
            return this.projectDAO2.findUserByUsernameAndPassword(username, password);
        })
    }


}

module.exports = Controller;