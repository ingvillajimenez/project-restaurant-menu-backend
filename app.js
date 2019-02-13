require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const ODM = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const api = require('./src/routes/api');

ODM.connect(MONGODB_URI, {
    useNewUrlParser: true
});

ODM.connection.on('connected', () => {
    const msg = {
        success: true
    };

    console.log(JSON.stringify(msg, null, 2));
});

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.send({
        message: 'Hello there'
    });
})

app.use('/api/v1', api);

app.listen(PORT, () => {
    console.log(`REST API listening on PORT: ${ PORT }`);
})