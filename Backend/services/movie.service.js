const Movie = require('../models/movie.model');

const createMovie = async (data) => {
    const movie = await Movie.create(data);
    return movie;
}

const deleteMovie = async (id) => {
    const response = await Movie.deleteOne({
        _id: id
    });
    return response;
}

const getMovieById = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        return{
            err:"Movie not found",
            code: 404
        }
    }
    return movie;
}

module.exports = {
    getMovieById,
    createMovie,
    deleteMovie,

}