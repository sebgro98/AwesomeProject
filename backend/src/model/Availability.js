const Sequelize = require('sequelize');
const Person = require("./Person");
/**
 * Represents an availability model using Sequelize.
 * @extends Sequelize.Model
 */
class Availability extends Sequelize.Model {
    /**
     * Returns the model name for the Availability class.
     * @returns {string} The model name.
     */
    static get AVAILABILITY_MODEL_NAME() {
        return 'availability';
    }

    /**
     * Creates and initializes the Availability model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {Availability} The initialized Availability model.
     */
    static createModel(sequelize) {
        Availability.init(
            {
                availability_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                person_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                from_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                to_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
            { sequelize, modelName: Availability.AVAILABILITY_MODEL_NAME, tableName: Availability.AVAILABILITY_MODEL_NAME, timestamps: false }
        );
        Availability.belongsTo(Person, { foreignKey: 'person_id' });
        return Availability;
    }
}
module.exports = Availability;