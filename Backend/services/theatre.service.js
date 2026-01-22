const Theatre = require("../models/theatre.model");

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
    if (err.name === "ValidationError") {
      let err = {};
      Object.keys(err.errors).forEach((key) => {
        err[key] = err.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    if (err.code === 11000) {
      return {
        err: { name: "Theatre with this name already exists" },
        code: 409,
      };
    }
    console.log("Error in creating theatre", err);
    throw err;
  }
};

const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "Theatre not found",
        code: 404,
      };
    }
    return response;
  } catch (err) {
    throw new Error("Error in deleting theatre");
  }
};

const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return {
        err: "Theatre not found",
        code: 404,
      };
    }
    return response;
  } catch (err) {
    throw new Error("Error in updating theatre");
  }
};

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

const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};
    if (data && data.city) {
      query.city = data.city;
    }
    if (data && data.pincode) {
      query.pincode = data.pincode;
    }
    if (data && data.name) {
      query.name = data.name;
    }
    if (data && data.limit) {
      pagination.limit = data.limit;
    }
    if (data && data.skip) {
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }
    const response = await Theatre.find(query, {}, pagination);
    if (!response) {
      return {
        err: "Theatre not found",
        code: 404,
      };
    }
    return response;
  } catch (err) {
    throw new Error("Error in Fetching Theatres");
  }
};

const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    if (insert) {
      await Theatre.updateOne(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
      );
    } else {
      await Theatre.updateOne(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
      );
    }
    const theatre = await Theatre.findById(theatreId).populate("movies");
    return theatre;
  } catch (err) {
    throw new Error("Error in updating movies in theatre");
  }
};

module.exports = {
  createTheatre,
  deleteTheatre,
  updateTheatre,
  getTheatre,
  getAllTheatres,
  updateMoviesInTheatres,
};
