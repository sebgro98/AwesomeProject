const Sequelize = require('sequelize');
const Person = require("./Person");
/**
 * Represents an competence profile model using Sequelize.
 * @extends Sequelize.Model
 */
class CompetenceProfile extends Sequelize.Model {
    /**
     * Returns the model name for the CompetenceProfile class.
     * @returns {string} The model name.
     */
    static get COMPETENCE_PROFILE_MODEL_NAME() {
        return 'competence_profile';
    }

    /**
     * Creates and initializes the CompetenceProfile model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {CompetenceProfile} The initialized CompetenceProfile model.
     */
    static createModel(sequelize) {
        CompetenceProfile.init(
            {
                competence_profile_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                person_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                competence_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                years_of_experience: {
                    type: Sequelize.DECIMAL(4,2),
                    allowNull: false,
                },
            },
            { sequelize, modelName: CompetenceProfile.COMPETENCE_PROFILE_MODEL_NAME, tableName: CompetenceProfile.COMPETENCE_PROFILE_MODEL_NAME, timestamps: false }
        );
        CompetenceProfile.belongsTo(Person, { foreignKey: 'person_id' });
        return CompetenceProfile;
    }
}
module.exports = CompetenceProfile;