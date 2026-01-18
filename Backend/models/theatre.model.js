const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    description: String,

    city: {
        type: String, 
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String
}, {timestamps: true});

module.exports = mongoose.model('Theatre', theatreSchema);