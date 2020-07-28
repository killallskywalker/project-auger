const { validate, ValidationError, Joi } = require('express-validation')

module.exports = {
    // Simple validation to ensure user send name , email and category to retrieve product quotation
    quotationValidation: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            category: Joi.array().items(Joi.string().valid("e-hailing", "tunda", "servis", "gantian"))
        }),
    },
}

  