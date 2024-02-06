const ProjectDAO2 = require('../integration/ProjectDAO2');

class Controller {
    constructor() {
        this.ProjectDAO2 = new ProjectDAO2();
    }

    async login(username, password) {
        return this.ProjectDAO2.findUserByUsernameAndPassword(username, password);
    }
}

module.exports = Controller;