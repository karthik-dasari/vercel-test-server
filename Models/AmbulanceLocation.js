const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbulanceLocationSchema = new Schema({
    sid: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    }
});

module.exports = mongoose.model('AmbulanceLocation', AmbulanceLocationSchema);