require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const app = express();
//PIPELINE begins
// Standard middleware
app.use(cors());
app.use(helmet());

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));

//Routes
app.get('/', (req, res) => {
  JSON.parse('{"key" : "value"}');

  res.json({ message: 'Hello, world!' });
});

// Error handlers
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { message: 'Internal server error' };
  } else {
    console.error(error);
    response = { error, message: error.message };
  }
  res.status(500).json(response);
});

//PIPELINE ends

module.exports = app;
