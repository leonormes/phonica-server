const express = require('express');
const expressGraphQL = require('express-graphql');
const logger = require('morgan');
const bodyParser = require('body-parser');
const schema = require('./server/routes/schema');
const cors = require('cors');
require('dotenv').config();

// Routes
const PhonemeRouter = require('./server/routes/phonemeRoutes');
const CardSetRouter = require('./server/routes/cardSetRoutes');
const GraphemeRouter = require('./server/routes/graphemeRoutes');
const WordRouter = require('./server/routes/wordRoutes');
const PhonicSchemeRouter = require('./server/routes/phonicSchemeRoutes');
// FIXES CORS ERROR
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};
// Set up the express app
const app = express();
app.use(cors(corsOptions));
console.log('Env as string', process.env.NODE_ENV);
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/phonemes', PhonemeRouter);
app.use('/graphemes', GraphemeRouter);
app.use('/words', WordRouter);
app.use('/cardsets', CardSetRouter);
app.use('/phonicschemes', PhonicSchemeRouter);
// Setup a default catch-all route that sends back a welcome message
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  })
);

module.exports = app;
