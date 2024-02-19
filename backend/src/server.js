const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');

require('dotenv-safe').config();

const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors middleware
const session = require("express-session");
const MemoryStore = require('memorystore')(session);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 86400000 }) // saved for 1 day, not recommended for production environments
})); //                                           or applications with a large number of users because it stores session data in the server's memory

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
};

app.use(cors(corsOptions));

//const cookieParser = require('cookie-parser');
//app.use(cookieParser());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
    return res.send('hello :)');
});

const reqHandlerLoader = require('./api');
reqHandlerLoader.loadReqHandlers(app);
reqHandlerLoader.loadErrorHandlers(app);


const server = app.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOST,
    () => {
        console.log(`Server on port ${server.address().address}:${server.address().port}`);
    }
);