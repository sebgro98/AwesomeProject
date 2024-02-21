const Sequelize = require('sequelize');
/**
 * Represents a person model using Sequelize.
 * @extends Sequelize.Model
 */
class Person extends Sequelize.Model {
    /**
     * Returns the model name for the Person class.
     * @returns {string} The model name.
     */
    static get PERSON_MODEL_NAME() {
        return 'person';
    }

    /**
     * Creates and initializes the Person model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {Person} The initialized Person model.
     */
    static createModel(sequelize) {
        Person.init(
            {
                person_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                surname: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                pnr: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                role_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                application_status_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 1, // Set the default value to 1
                },
            },
            { sequelize, modelName: Person.PERSON_MODEL_NAME, tableName: Person.PERSON_MODEL_NAME, timestamps: false }
        );

        return Person;
    }
}
module.exports = Person;