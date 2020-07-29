const express = require('express');
const { validate } = require('express-validation')
const {quotationValidation} = require('./../validation/validation');
const router = express.Router();

const { getPlan , getPlans , getPlanQuotation} = require('../controller/planController');

router.post('/' , validate(quotationValidation , {}, {}) , getPlanQuotation);
router.get('/' ,  getPlans);
router.get('/:id' , getPlan);

module.exports = router;