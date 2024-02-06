const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Person = require('../model/Person');
require('dotenv-safe').config();
const PersonDTO = require('../model/PersonDTO');


class ProjectDAO {
    constructor() {
        const namespace = cls.createNamespace('projectDB');
        Sequelize.useCLS(namespace);

        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT
            }
        );



        Person.createModel(this.database);


        this.createTables(); // Optionally, call this to sync models with DB
    }
    getTransactionMgr() {
        return this.database;
    }
    async createTables() {
        try {
            await this.database.authenticate();
            await this.database.sync({ force: false });
        } catch (err) {
            console.error('Error connecting to the database:', err);
            throw new Error('Could not connect to database.');
        }
    }

    async findUserByUsernameAndPassword(username, password) {
        try {
            const person = await Person.findOne({
                where: {
                    username: username,
                    password: password // Again, note about password security
                }
            });

            return person !== null;
        } catch (error) {
            console.error('Error in findUserByUsernameAndPassword:', error);
            throw error; // Or handle the error as per your application's needs
        }
    }

    // ...additional methods as needed...
}

module.exports = ProjectDAO;
