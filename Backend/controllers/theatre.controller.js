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
    if(response.err){
        errResponseBody.error = response.err;
        const statusCode = response.code || 422;
        const message = statusCode === 409 ? "Theatre already exists" : "Validation failed on few parameters of the req body";
        errResponseBody.message = message;
        return res.status(statusCode).json(errResponseBody);
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

module.exports = {
  createTheatre,
};
