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
    address: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie'
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Theatre', theatreSchema);