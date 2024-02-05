const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
class DAO {
    async findUserByUsernameAndPassword(username, password) {
        const result = await pool.query('SELECT * FROM person WHERE username = $1 AND password = $2', [username, password]);
        return result.rows.length > 0;
    }
}

module.exports = DAO;