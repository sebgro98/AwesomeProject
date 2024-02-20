const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Person = require('../model/Person');
const Availability = require('../model/Availability');
const CompetenceProfile = require('../model/CompetenceProfile');
const WError = require('verror').WError;
const PersonDTO = require('../model/PersonDTO');
const Validators = require("../util/Validators");

/**
 * ProjectDAO class handles database operations related to the project.
 * It uses Sequelize ORM to interact with the database and manages the Person model.
 */
class ProjectDAO {

    /**
     * Creates a new instance of ProjectDAO and initializes the database connection.
     * Optionally, it can sync models with the database by calling createTables().
     * @constructor
     */
    constructor() {
        // Initialize CLS namespace for Sequelize
        const namespace = cls.createNamespace('projectDB');
        Sequelize.useCLS(namespace);

        // Establish database connection using environment variables
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT
            }
        );


        // Create Person model
        Person.createModel(this.database);
        Availability.createModel(this.database);
        CompetenceProfile.createModel(this.database);


        this.createTables();
    }




    /**
     * Returns the Sequelize transaction manager for database transactions.
     * @return {Object} The transaction manager object.
     */
    getTransactionMgr() {
        return this.database;
    }

    /**
     * Creates non-existing tables in the database, if any.
     * @throws {Error} If unable to connect to the database.
     */
    async createTables() {
        try {
            await this.database.authenticate();
            await this.database.sync({ force: false });
        } catch (err) {
            console.error('Error connecting to the database:', err);
            throw new Error('Could not connect to database.');
        }
    }

    /**
     * Finds a user by username and password and returns a PersonDTO object.
     * @param {string} username The username of the user to find.
     * @param {string} password The password of the user to find.
     * @return {PersonDTO} A PersonDTO object representing the found user.
     * @throws {Error} If an error occurs during the database operation.
     */
    async findUserByUsernameAndPassword(username, password) {
        try {
            const person = await Person.findOne({
                where: {
                    username: username,
                    password: password
                }
            });
            return this.createPersonDTO(person);
        } catch (error) {
            throw new WError(
                {
                    cause: error,
                    info: {
                        ProjectDAO: 'Failed to login',
                        username: username,
                        password: password
                    }
                },
                'Could not find user by login details'
            )
        }
    }

    /**
     * Creates a new user and returns a PersonDTO object for the created user.
     * If a user with the same pnr already exists, updates the existing record.
     * @param {Object} userData An object containing user registration data.
     * @return {PersonDTO} A PersonDTO object representing the newly created or updated user.
     * @throws {Error} If an error occurs during the database operation.
     */
    async createNewUser(userData) {
        try {
            // Check if a person with the same pnr exists
            const existingPerson = await Person.findOne({
                where: {
                    pnr: userData.personNumber
                }
            });

            if (existingPerson) {
                // Update the existing record if a person with the same pnr is found
                await existingPerson.update({
                    name: userData.firstName,
                    surname: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                    role_id: 2, // this is for applicant or recruiter
                    username: userData.username
                });

                return this.createPersonDTO(existingPerson);
            } else {
                // Create a new user if no person with the same pnr is found
                const createdPerson = await Person.create({
                    name: userData.firstName,
                    surname: userData.lastName,
                    pnr: userData.personNumber,
                    email: userData.email,
                    password: userData.password,
                    role_id: 2, // this is for applicant or recruiter
                    username: userData.username
                });

                return this.createPersonDTO(createdPerson);
            }
        } catch (error) {
            throw new WError(
                {
                    cause: error,
                    info: {
                        ProjectDAO: 'Failed to create/update a user',
                        userData: userData
                    }
                },
                'Could not create/update a user'
            );
        }
    }


    /**
     * Creates a PersonDTO object from the given Person model object.
     * @param {Object} person The Person model object.
     * @return {PersonDTO} A PersonDTO object representing the given Person.
     */
    createPersonDTO(person) {
        return new PersonDTO(
            person.person_id,
            person.name,
            person.surname,
            person.pnr,
            person.email,
            person.password,
            person.role_id,
            person.username)
    }


    async findPersonByUsername(username) {
        try {
            Validators.isAlnumString(username, 'username');
            const person = await Person.findOne(  {
                where: {username: username},
            });
            if(person) {
                return this.createPersonDTO(person);
            }
            return null;
        } catch(err) {
            throw new WError(
                {
                    cause: err,
                    info: {
                        ProjectDAO: 'Failed to find person',
                        username: username,
                    },
                },
                'Could not find person with username ${username}.',
            );
        }
    }

    async createApplication(application) {
        try {

            //Delete availability from previous applications
            await Availability.destroy({
                where: {
                    person_id: application.personId
                }
            });

            //Delete competence from previous applications
            await CompetenceProfile.destroy({
                where: {
                    person_id: application.personId
                }
            });

            for (const competenceProfile of application.competenceProfile) {
                await CompetenceProfile.create({
                    person_id: application.personId,
                    competence_id: competenceProfile.competence,
                    years_of_experience: competenceProfile.experience,
                });
            }

            for (const availability of application.availability) {
                await Availability.create({
                    person_id: application.personId,
                    from_date: availability.startDate,
                    to_date: availability.endDate,
                });
            }
        }
        catch(err) {
            throw new WError(
                {
                    cause: err,
                    info: {
                        ProjectDAO: 'Failed to create application',
                        application: application,
                    },
                },
                'Could not create application'
            );
        }

    }
}

module.exports = ProjectDAO;
