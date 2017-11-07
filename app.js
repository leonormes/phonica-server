const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const PhonemeRouter = require('./server/routes/phonemeRoutes');
const GraphemeRouter = require('./server/routes/graphemeRoutes');
const WordRouter = require('./server/routes/wordRoutes');
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/phonemes', PhonemeRouter);
app.use('/graphemes', GraphemeRouter);
app.use('/words', WordRouter);
// Setup a default catch-all route that sends back a welcome message
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  })
);

module.exports = app;
