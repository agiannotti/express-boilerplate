require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const folderRouter = require('./Folders/folder-router');
const noteRouter = require('./Notes/note-router');

const app = express();
app.use(cors());
app.use(helmet());

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));

app.use('/api/folder', folderRouter);
app.use(noteRouter);

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

module.exports = app;
