//Entry point for all routes
const express = require('express');
const router = express.Router();

//Import all required router
const planRouter = require('./planRouter');

router.use('/plans', planRouter);

module.exports = router;
