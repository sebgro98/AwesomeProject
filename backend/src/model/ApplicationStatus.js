const Sequelize = require('sequelize');
/**
 * Represents an application status model using Sequelize.
 * @extends Sequelize.Model
 */
class ApplicationStatus extends Sequelize.Model {
    /**
     * Returns the model name for the ApplicationStatus class.
     * @returns {string} The model name.
     */
    static get APPLICATION_STATUS_MODEL_NAME() {
        return 'application_status';
    }

    /**
     * Creates and initializes the ApplicationStatus model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {ApplicationStatus} The initialized ApplicationStatus model.
     */
    static createModel(sequelize) {
        ApplicationStatus.init(
            {
                application_status_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: ApplicationStatus.APPLICATION_STATUS_MODEL_NAME, tableName: ApplicationStatus.APPLICATION_STATUS_MODEL_NAME, timestamps: false }
        );
        return ApplicationStatus;
    }
}
module.exports = ApplicationStatus;