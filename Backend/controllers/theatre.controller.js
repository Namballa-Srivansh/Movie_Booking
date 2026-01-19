const Theatre = require("../models/theatre.model");
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
      return res.status(response.code || 422).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    res.status(201).json(successResponseBody);
  } catch (err) {
    errResponseBody.error = err;
    errResponseBody.message = "Error in creating theatre";
    res.status(500).json(errResponseBody);
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre(req.params.id);
    if (response.err) {
      errResponseBody.error = response.err;
      errResponseBody.message = "Theatre not found";
      return res.status(404).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    res.status(200).json(successResponseBody);
  } catch (err) {
    errResponseBody.error = err;
    errResponseBody.message = "Error in deleting theatre";
    res.status(500).json(errResponseBody);
  }
}

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if (response.err) {
      errResponseBody.error = response.err;
      errResponseBody.message = "Theatre not found";
      return res.status(404).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre fetched successfully";
    res.status(200).json(successResponseBody);
  } catch (err) {
    errResponseBody.error = err;
    errResponseBody.message = "Error in fetching theatre";
    res.status(500).json(errResponseBody);
  }
}



module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
};
