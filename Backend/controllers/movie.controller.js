const Movie = require('../models/movie.model');

// controller function to create a movie and return movie created

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: "Movie created successfully"
        });
    }
    catch (err) {
        console.log("Error in creating movie", err);
        res.status(500).json({
            success: false,
            error: err,
            data: {},
            message: "Unable to create movie"
        });
    }
}

module.exports = {
    createMovie
};