const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    ambNumber: {
        type: String,
    },
    hospitalID: {
        type: String,
    },
    description: {
        type: String,
    },
    status:{
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', RequestSchema);