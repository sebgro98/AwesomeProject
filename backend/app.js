const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

