const { Pool } = require('pg');
require('dotenv-safe').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const { Client } = require('pg');

async function testDirectConnection() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: String(process.env.DB_PASS), // ensure this is correct
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT NOW()');
        console.log(res);
        await client.end();
    } catch (err) {
        console.error(err);
    }
}

testDirectConnection();

class ProjectDAO {
    async findUserByUsernameAndPassword(username, password) {
        console.log("Username type:", typeof username, "Password type:", typeof password);
        const result = await pool.query('SELECT * FROM person WHERE username = $1 AND password = $2', [username, password]);
        return result.rows.length > 0;
    }
}

module.exports = ProjectDAO;