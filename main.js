
const express = require('express');
const serverless = require("serverless-http");
const middleware = require("./middleware/index");
const connection = require('./connection');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Load all routes
app.use('/', routes);

// Middleware error 
app.use(middleware.errorHandler);

const handler = serverless(app);

exports.handler = async (event, context) => {
    context.connection = await connection.connectToDatabase()
    return await handler(event, context);
};