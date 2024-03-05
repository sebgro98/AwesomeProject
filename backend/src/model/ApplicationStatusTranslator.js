const Sequelize = require('sequelize');
/**
 * Represents an application status translator model using Sequelize.
 * @extends Sequelize.Model
 */
class ApplicationStatusTranslator extends Sequelize.Model {
    /**
     * Returns the model name for the ApplicationStatusTranslator class.
     * @returns {string} The model name.
     */
    static get APPLICATION_STATUS_TRANSLATOR_MODEL_NAME() {
        return 'application_status_translation';
    }

    /**
     * Creates and initializes the ApplicationStatusTranslator model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {ApplicationStatusTranslator} The initialized ApplicationStatusTranslator model.
     */
    static createModel(sequelize) {
        ApplicationStatusTranslator.init(
            {
                application_status_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: false
                },
                lang: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    autoIncrement: false,
                },
                translated_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: ApplicationStatusTranslator.APPLICATION_STATUS_TRANSLATOR_MODEL_NAME, tableName: ApplicationStatusTranslator.APPLICATION_STATUS_TRANSLATOR_MODEL_NAME, timestamps: false }
        );
        return ApplicationStatusTranslator;
    }
}
module.exports = ApplicationStatusTranslator;