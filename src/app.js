require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(helmet());

const morganOption = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));

module.exports = app;
