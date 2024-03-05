const Sequelize = require('sequelize');
/**
 * Represents an competence translator model using Sequelize.
 * @extends Sequelize.Model
 */
class CompetenceTranslator extends Sequelize.Model {
    /**
     * Returns the model name for the CompetenceTranslator class.
     * @returns {string} The model name.
     */
    static get COMPETENCE_TRANSLATOR_MODEL_NAME() {
        return 'competence_translation';
    }

    /**
     * Creates and initializes the CompetenceTranslator model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {CompetenceTranslator} The initialized CompetenceTranslator model.
     */
    static createModel(sequelize) {
        CompetenceTranslator.init(
            {
                competence_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: false,
                },
                lang: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    allowNull: false,
                },
                translated_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: CompetenceTranslator.COMPETENCE_TRANSLATOR_MODEL_NAME, tableName: CompetenceTranslator.COMPETENCE_TRANSLATOR_MODEL_NAME, timestamps: false }
        );
        return CompetenceTranslator;
    }
}
module.exports = CompetenceTranslator;