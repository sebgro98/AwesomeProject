const Sequelize = require('sequelize');
/**
 * Represents an competence model using Sequelize.
 * @extends Sequelize.Model
 */
class Role extends Sequelize.Model {
    /**
     * Returns the model name for the Role class.
     * @returns {string} The model name.
     */
    static get ROLE_MODEL_NAME() {
        return 'role';
    }

    /**
     * Creates and initializes the Role model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     * @returns {Competence} The initialized Role model.
     */
    static createModel(sequelize) {
        Role.init(
            {
                role_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: Role.ROLE_MODEL_NAME, tableName: Role.ROLE_MODEL_NAME, timestamps: false }
        );
        return Role;
    }
}
module.exports = Role;