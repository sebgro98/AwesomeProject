const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');

require('dotenv-safe').config();

const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors middleware

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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