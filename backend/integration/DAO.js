const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const cors = require('cors');

const pool = new Pool({
    connectionString: 'postgresql://postgres:Sushilkc2002@localhost:5432/rec-app',
});


app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/person', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM person');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide both username and password.' });
    }

    try {
        const result = await pool.query('SELECT * FROM person WHERE name = $1 AND password = $2', [username, password]);

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
