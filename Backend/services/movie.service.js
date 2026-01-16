const Movie = require('../models/movie.model');

const createMovie = async (data) => {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return{err: err, code: 422};
        }
        else{
            throw error;
        }
         
    }
    
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

const updateMovieById = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, {new: true, runValidators: true});
        if(!movie){
            return{
                err:"Movie not found",
                code: 404
            }
        }
        return movie;
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return{err: err, code: 422};
        }
        else{
            throw error;
        }
    }
}

module.exports = {
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovieById

}