const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    provider:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:[{
        info:{
            type: String,
            require: true
        }
    }],
    categoryCover:[]
},{timestamps: true});

module.exports = mongoose.model('Plan', PlanSchema);
