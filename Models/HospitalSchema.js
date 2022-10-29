const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
    name: {
        type: String,
    },
    lat: {
        type: String,
    },
    lon: {
        type: String,
    },
    address: {
        type: String,
    },
});

module.exports = mongoose.model('Hospital', HospitalSchema);