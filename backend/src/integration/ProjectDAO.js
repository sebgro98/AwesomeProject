const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Person = require('../model/Person');
const Availability = require('../model/Availability');
const CompetenceProfile = require('../model/CompetenceProfile');
const WError = require('verror').WError;
const PersonDTO = require('../model/PersonDTO');
const Validators = require("../util/Validators");
const { Op } = require('sequelize');
const {
    isValidEmail,
    isValidPersonNumber,
    // Add other validation functions as needed
} = require('./Validation');

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

        // Check if running in production (on Heroku)

            // Use DATABASE_URL for Heroku
            this.database = new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres',
                protocol: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false // Required for Heroku's self-signed certificate
                    }
                }
            });

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
     * @throws {Error} If an error occurs during the database operation or if the validation fails.
     */
    async createNewUser(userData) {
        try {
            // Validate email
            if (!isValidEmail(userData.email)) {
                throw new Error('Invalid email address');
            }

            // Validate person number
            if (!isValidPersonNumber(userData.personNumber)) {
                throw new Error('Invalid person number');
            }

            // Check if a person with the same email exists
            const existingPerson = await Person.findOne({
                where: {
                    email: userData.email
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
                    username: userData.username,
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
                    username: userData.username,
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
            person.username,
            person.application_status_id)
    }

    /**
     * Asynchronously finds a person by their username.
     *
     * @param {string} username - The username of the person to be found.
     * @returns {PersonDTO|null} Returns a Person Data Transfer Object (DTO) if the person is found, otherwise returns null.
     * @throws {WError} Throws a wrapped error if there's an issue during the process, including database errors or if the username does not meet validation criteria.
     */
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

    /**
     * Asynchronously creates a new application, handling the submission
     * of availabilities, competence profiles, and updating application status.
     *
     * @param {Object} application - The application object containing applicant details,
     * competencies, and availabilities.
     * @param {string} application.personId - The unique identifier of the person submitting the application.
     * @param {Array} application.competenceProfile - An array of competence profiles associated with the application.
     * @param {string} application.competenceProfile.competence - The ID of the competence.
     * @param {number} application.competenceProfile.experience - Years of experience in the competence.
     * @param {Array} application.availability - An array of availability periods associated with the application.
     * @param {string} application.availability.startDate - The start date of the availability period.
     * @param {string} application.availability.endDate - The end date of the availability period.
     */
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

            await Person.update(
                { application_status_id: 4 },
                {where: { person_id: application.personId },}
            );
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

    /**
     * Retrieves all applications where the application status is not equal to 1.
     * This function does not take any external parameters.
     *
     * @returns {Array} An array of application data transformed into DTOs (Data Transfer Objects).
     *                  Each DTO represents a person who has applied.
     *
     * @throws {WError} Throws a wrapped error (WError) if there is a failure in retrieving the applications.
     *                  The error includes details specific to the ProjectDAO context and a descriptive message.
     */
    async getApplications() {
        try {

            const persons = await Person.findAll({
                where: {
                    application_status_id: {
                        [Op.not]: 1 // Assuming application_status_id != 1
                    }
                }
            });

            return persons.map(person => this.createPersonDTO(person));
        } catch (error) {
            throw new WError(
                {
                    cause: error,
                    info: {
                        ProjectDAO: 'Failed to retrieve applications'
                    }
                },
                'Could not retrieve applications'
            );
        }
    }
}



module.exports = ProjectDAO;
