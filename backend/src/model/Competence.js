const Sequelize = require('sequelize');
/**
 * Represents an competence model using Sequelize.
 * @extends Sequelize.Model
 */
class Competence extends Sequelize.Model {
    /**
     * Returns the model name for the Competence class.
     * @returns {string} The model name.
     */
    static get COMPETENCE_MODEL_NAME() {
        return 'competence';
    }

    /**
     * Creates and initializes the Competence model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {Competence} The initialized Competence model.
     */
    static createModel(sequelize) {
        Competence.init(
            {
                competence_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: Competence.COMPETENCE_MODEL_NAME, tableName: Competence.COMPETENCE_MODEL_NAME, timestamps: false }
        );
        return Competence;
    }
}
module.exports = Competence;