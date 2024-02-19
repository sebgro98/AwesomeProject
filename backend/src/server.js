const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');

// Load environment variables from .env file
require('dotenv-safe').config();

const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors middleware

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
};
app.use(cors(corsOptions));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

// Default route
app.get('/', (req, res) => {
    return res.send('hello :)');
});

// Load request handlers and error handlers from the 'api' directory
const reqHandlerLoader = require('./api');
reqHandlerLoader.loadReqHandlers(app);
reqHandlerLoader.loadErrorHandlers(app);

// Start the server
const server = app.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOST,
    () => {
        console.log(`Server on port ${server.address().address}:${server.address().port}`);
    }
);
