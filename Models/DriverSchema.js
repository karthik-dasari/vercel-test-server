const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    username: {
        type: String,
    },
    ambNumber: {
        type: String,
    }
});

module.exports = mongoose.model('Driver', DriverSchema);