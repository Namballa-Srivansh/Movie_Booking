const jwt = require("jsonwebtoken");
const { errResponseBody } = require("../utils/responsebody");
const userService = require("../services/user.service")

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

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if(!token) {
      errResponseBody.err = "No token provided";
      return res.status(400).json(errResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if(!response) {
      errResponseBody.err = "Token not verified";
      return res.status(401).json(errResponseBody);
    }
    const user = await userService.getUserById(response.id);
    req.user = user.id;
    next()

  } catch(err) {
    if(err.name == "JsonWebTokenError") {
      errResponseBody.err = err.message;
      return res.status(401).json(errResponseBody);
    }
    if(err.code == 404) {
      errResponseBody.err = "User doesn't exists";
      return res.status(err.code).json(errResponseBody);
    }
    errResponseBody.err = err;
    return res.status(500).json(errResponseBody);
  }
}

const validateResetPasswordRequest = async (req, res, next) => {
  if(req.body.oldPassword) {
    errResponseBody.err = "Missing the old password in the request";
    return res.status(400).json(errResponseBody)
  }

  if(req.body.newPassword) {
    errResponseBody.err = "Missing the new password in the request";
    return res.status(400).json(errResponseBody)
  }

  next();
}

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  isAuthenticated,
  validateResetPasswordRequest,
};
