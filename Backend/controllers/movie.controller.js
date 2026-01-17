const Movie = require('../models/movie.model');
const movieService = require('../services/movie.service');
const { errResponseBody, successResponseBody } = require('../utils/responsebody');

// controller function to create a movie and return movie created

const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMovie(req.body);
        if(response.err){
            errResponseBody.err = response.err;
            errResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie created successfully";
        res.status(201).json(successResponseBody);
    }
    catch (err) {
        console.log("Error in creating movie", err);
        returnres.status(500).json(errResponseBody);
    }
}

const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id);
        successResponseBody.data = response;
        res.status(200).json(successResponseBody);
         
    } catch (err) {
        console.log("Error in deleting movie", err);
        returnres.status(500).json(errResponseBody);
    }
}

const getMovie = async (req, res) => {
    try {
        const response = await movieService.getMovieById(req);
        if(response.err){
            errResponseBody.err = response.err;
            errResponseBody.message = "Cannot find movie with given id";
            return res.status(response.code).json(errResponseBody);
        }

        successResponseBody.data = response;
        res.status(200).json(successResponseBody);

    } catch (err) {
        console.log("Error in fetching movie", err);
        return res.status(500).json(errResponseBody);
    }
}

const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovieById(req.params.id, req.body);
        if(response.err){
            errResponseBody.err = response.err;
            errResponseBody.message = "Cannot update movie with given id";
            return res.status(response.code).json(errResponseBody);
        }
        successResponseBody.data = response;
        res.status(200).json(successResponseBody);
    } catch (err) {
        console.log("Error in updating movie", err);
        return res.status(500).json(errResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await movieService.fetchMovies(req.query);
        if(response.err){
            errResponseBody.err = response.err;
            errResponseBody.message = "No movies found";
            return res.status(response.code).json(errResponseBody);
        }
        successResponseBody.data = response;
        res.status(200).json(successResponseBody);
    } catch (err) {
        console.log("Error in fetching movies", err);
        return res.status(500).json(errResponseBody);
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
};

