const { errResponseBody } = require("../utils/responsebody");

const validateTheatreCreateRequest = (req, res, next) => {
  if (!req.body || !req.body.name) {
    errResponseBody.err =
      "The name of the theatre is not present in the request sent";
    return res.status(400).json(errResponseBody);
  }

  if (!req.body || !req.body.city) {
    errResponseBody.err =
      "The city of the theatre is not present in the request sent";
    return res.status(400).json(errResponseBody);
  }

  if (!req.body || !req.body.address) {
    errResponseBody.err =
      "The address of the theatre is not present in the request sent";
    return res.status(400).json(errResponseBody);
  }

  if (!req.body || !req.body.pincode) {
    errResponseBody.err =
      "The pincode of the theatre is not present in the request sent";
    return res.status(400).json(errResponseBody);
  }

  next();
};

const validateUpdateMoviesRequest = async (req, res, next) => {
  if (!req.body || req.body.insert === undefined) {
    errResponseBody.err = "the insert parameter is missing in the request";
    return res.status(400).json(errResponseBody);
  }
  if (!req.body || !req.body.movieIds) {
    errResponseBody.err =
      "The movieIds are not present in the request to be updated in the Theatre";
    return res.status(400).json(errResponseBody);
  }
  if (!req.body || !(req.body.movieIds instanceof Array)) {
    errResponseBody.err =
      "Expected array of movieIds but found something else";
    return res.status(400).json(errResponseBody);
  }
  if (!req.body || req.body.movieIds.length === 0) {
    errResponseBody.err = "No movies present in the array provided";
    return res.status(400).json(errResponseBody);
  }
  next();
};

module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMoviesRequest,
};
