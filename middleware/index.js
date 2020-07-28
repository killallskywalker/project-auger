const {ValidationError} = require('express-validation')

module.exports = {
    errorHandler: async (err , req, res, next) => {
        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err)
        }
        return res.status(500).json({success:false,message:err.message,data:null})
    }
}