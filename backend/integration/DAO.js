const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide both username and password.' });
    }

    try {
        const result = await pool.query('SELECT * FROM person WHERE username = $1 AND password = $2', [username, password]);

        if (result.rows.length > 0) {
            // User exists
            res.status(200).json({ message: 'Login successful' });
        } else {
            // User does not exist or password is incorrect
            res.status(401).json({ error: 'Login failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
