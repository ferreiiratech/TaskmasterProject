const express = require('express');
const conectToDB = require("./src/database/db");

conectToDB();
const app = express();

module.exports = app;