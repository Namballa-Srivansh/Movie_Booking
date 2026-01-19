const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
    try {
        console.log("Received data for theatre creation:", data);
        // Remove _id if present to ensure new document creation
        delete data._id;
        console.log("Data after removing _id:", data);
        const response = await Theatre.create(data);
        console.log("Created theatre:", response);
        return response;
    } catch (err) {
        if(err.name ==="ValidationError") {
            let err = {};
            Object.keys(err.errors).forEach((key) => {
                err[key] = err.errors[key].message;
            });
            return {err: err, code: 422}
        }
        if (err.code === 11000) {
            return {err: {name: "Theatre with this name already exists"}, code: 409}
        }
        console.log("Error in creating theatre", err);
        throw err;
    }
}

const deleteTheatre = async(id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if(!response) {
      return {
        err: "Theatre not found",
        code: 404
      }
    }
    return response;
  } catch(err) {
    throw new Error("Error in deleting theatre");
  }
}

const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      return {
        err: "Theatre not found",
        code: 404,
      };
    }
    return response;
  } catch (err) {
    throw new Error("Error in fetching theatre");
  }
};

const getAllTheatres = async(data) => {
    try {
        const response = await Theatre.find({})
        if(!response) {
            return {
                err: "Theatre not found",
                code: 404
            }
        }
        return response
    } catch(err) {
        throw new Error("Error in Fetching Theatres")
    }
}

const updateMoviesInTheatres = async(theatreId, movieIds, insert) => {
  const theatre = await Theatre.findById(theatreId)
  if(!theatre) {
    return {
      err: "No such theatre found foe the id provided",
      code: 404
    }
  }

  if(insert) {
    // we need to add movies
    movieIds.forEach(movieId => {
      theatre.movies.push(movieId)
    })

  } else {
    // we need to remove movies
    let savedMovieIds = theatre.movies;
    movieIds.forEach(movieId => {
      savedMovieIds = savedMovieIds.filter(smi => smi == movieId)
      theatre.movies = savedMovieIds;
    })
  }
  await theatre.save();
  return theatre.populate('movies');
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres
}