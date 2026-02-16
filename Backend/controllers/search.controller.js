const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model');

exports.search = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        // Case-insensitive regex for broader matching
        const regex = new RegExp(query, 'i');

        // Search Movies
        const movies = await Movie.find({
            $or: [
                { name: regex },
                { description: regex },
                { director: regex },
                { language: regex },
                { casts: { $in: [regex] } }
            ]
        });

        const theatres = await Theatre.find({
            $or: [
                { name: regex },
                { city: regex },
                { address: regex }
            ]
        }).populate('movies', 'name');

        res.status(200).send({
            movies: movies,
            theatres: theatres,
            count: movies.length + theatres.length
        });

    } catch (err) {
        console.error("Search Error:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
