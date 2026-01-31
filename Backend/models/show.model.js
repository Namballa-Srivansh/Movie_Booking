const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timings: {
        type: String,
        required: true,
    },
    noOfSeats: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    format: {
        type: String,
    }
}, {timestamps: true});

showSchema.index({theatreId: 1, movieId: 1, timings: 1}, {unique: true});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;