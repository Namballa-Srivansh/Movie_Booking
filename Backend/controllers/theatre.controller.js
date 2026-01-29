const Theatre = require("../models/theatre.model");
const {STATUS} = require("../utils/constants")
const theatreService = require("../services/theatre.service");
const {
  errResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

// controller function to create a theatre and return theatre created

const createTheatre = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errResponseBody.error = response.err;
      errResponseBody.message = "Validation failed on few parameters of the request body";
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    res.status(STATUS.CREATED).json(successResponseBody);
  } catch (err) {
    console.log(err)
    errResponseBody.error = err;
    errResponseBody.message = "Error in creating theatre";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre(req.params.id);
    if (response.err) {
      errResponseBody.error = response.err;
      errResponseBody.message = "Theatre not found";
      return res.status(STATUS.NOT_FOUND).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    errResponseBody.error = err;
    errResponseBody.message = "Error in deleting theatre";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
}

const updateTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(req.params.id, req.body);
    if(response.err) {
      errResponseBody.error = response.err;
      errResponseBody.message = "Theatre not found";
      return res.status(STATUS.NOT_FOUND).json(errResponsebody)
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre upadated successfully";
    res.status(STATUS.OK).json(successResponseBody)
  } catch(err) {
      errResponseBody.error = err;
      errResponseBody.message = "Error in updating theatre";
      res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
}

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if (response.err) {
      errResponseBody.error = response.err;
      errResponseBody.message = "Theatre not found";
      return res.status(STATUS.NOT_FOUND).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre fetched successfully";
    res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    errResponseBody.error = err;
    errResponseBody.message = "Error in fetching theatre";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
}

const getAllTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query)
    if(!response) {
      errResponseBody.error = response.err
      errResponseBody.message = "Error in Fetching Theatres"
      return res.status(STATUS.NOT_FOUND).json(errResponseBody)
    }
    successResponseBody.data = response
    successResponseBody.message = "Theatre Fetched Successfully"
    res.status(STATUS.OK).json(successResponseBody)
  } catch (err) {
    errResponseBody.error = err;
    errResponseBody.message = "Error in fetching theatre";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
}

const updateMovies = async (req, res) => {
  try{
    const response = await theatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    )
    if(response.err){
      errResponseBody.err = response.err
      return res.status(response.code).json(errResponseBody)
    }
    successResponseBody.data = response;
    successResponseBody.message = "Succesfully updated Movies in Theatres"
    return res.status(STATUS.OK).json(successResponseBody)

  } catch(err) {
    errResponseBody.err = err
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody)
  }
}

const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInATheatre(req.params.id);
    if(!response) {
      errResponseBody.err = response.err
      errResponseBody.message = "Error in fetching movies in theatre"
      return res.status(STATUS.NOT_FOUND).json(errResponseBody)
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movies fetched successfully in theatre"
    return res.status(STATUS.OK).json(successResponseBody)
  } catch(err) {
    errResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody)
  }
}

const checkMovie = async (req, res) => {
  try {
    const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
    if(response.err) {
      errResponseBody.err = response.err
      errResponseBody.message = "Error in checking movie in theatre"
      return res.status(response.code).json(errResponseBody)
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie check successful in theatre"
    return res.status(STATUS.OK).json(successResponseBody)
  } catch(err) {
    errResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
}

module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
  updateTheatre,
  getAllTheatres,
  updateMovies,
  getMovies,
  checkMovie,
};
