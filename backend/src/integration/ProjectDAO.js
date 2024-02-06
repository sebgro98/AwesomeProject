const { Pool } = require('pg');
require('dotenv-safe').config();
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const Sequelize = require('sequelize');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

class ProjectDAO {
    async findUserByUsernameAndPassword(username, password) {
        console.log("Username type:", typeof username, "Password type:", typeof password);
        const result = await pool.query('SELECT * FROM person WHERE username = $1 AND password = $2', [username, password]);
        return result.rows.length > 0;
    }
}

module.exports = ProjectDAO;