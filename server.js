
const express = require('express');
const middleware = require("./middleware/index");
const connection = require('./connection');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Load all routes
app.use('/', routes);

// Middleware error handling
app.use(middleware.errorHandler);

module.exports = app;
