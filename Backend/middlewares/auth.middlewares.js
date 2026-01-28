const { errResponseBody } = require("../utils/responsebody");

const validateSignupRequest = async (req, res, next) => {
  //Validate name of the user
  if (!req.body.name) {
    errResponseBody.err = "Name of the user not present in the request";
    return res.status(400).json(errResponseBody);
  }
  //Validate password present of the user
  if (!req.body.password) {
    errResponseBody.err = "Password of the user not present in the request";
    return res.status(400).json(errResponseBody);
  }
  //Validate email of the user
  if (!req.body.email) {
    errResponseBody.err = "Email of the user not present in the request";
    return res.status(400).json(errResponseBody);
  }

  next()
};

const validateSigninRequest = async (req, res, next) => {

  if(!req.body.email) {
    errResponseBody.err = "No email provided for sign in";
    return res.status(400).json(errResponseBody);  
  }

  if(!req.body.password) {
    errResponseBody.err = "No password provided for sign in";
    return res.status(400).json(errResponseBody);
  }

  next();
}

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
};
