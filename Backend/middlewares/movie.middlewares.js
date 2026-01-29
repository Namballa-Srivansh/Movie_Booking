const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Malformed Request | Bad Request",
};

const validateMovieCreateRequest = async (req, res, next) => {
  //validate whether the request body has all the required fields

  if (!req.body.name) {
    badRequestResponse.err =
      "The name of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.description) {
    badRequestResponse.err =
      "The description of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  if (
    !req.body.casts ||
    (!req.body.casts) instanceof Array ||
    req.body.casts.length === 0
  ) {
    badRequestResponse.err =
      "The casts of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.trailerUrl) {
    badRequestResponse.err =
      "The trailerUrl of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.language || req.body.language.trim().length === 0) {
    badRequestResponse.err =
      "The language of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.releaseDate) {
    badRequestResponse.err =
      "The releaseDate of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.director || req.body.director.trim().length === 0) {
    badRequestResponse.err =
      "The director of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
  }

  next();
};

module.exports = {
  validateMovieCreateRequest,
};
