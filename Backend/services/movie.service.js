const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return { err: `A movie with this ${field} already exists`, code: 409 };
    } else {
      throw error;
    }
  }
};

const deleteMovie = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No movie found for the corresponding id",
        code: 404,
      };
    }
  } catch (err) {
    throw error;
  }
};

const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return {
      err: "Movie not found",
      code: 404,
    };
  }
  return movie;
};

const updateMovieById = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return {
        err: "Movie not found",
        code: 404,
      };
    }
    return movie;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};

const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movies = await Movie.find(query);

  if (!movies) {
    return {
      err: "No movies found",
      code: 404,
    };
  }
  return movies;
};

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovieById,
  fetchMovies,
};
