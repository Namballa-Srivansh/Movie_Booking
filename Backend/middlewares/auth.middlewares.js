const jwt = require("jsonwebtoken");
const { errResponseBody } = require("../utils/responsebody");
const userService = require("../services/user.service");
const { USER_ROLE, STATUS } = require("../utils/constants");

const validateSignupRequest = async (req, res, next) => {
  //Validate name of the user
  if (!req.body.name) {
    errResponseBody.message = "Name of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }
  //Validate password present of the user
  if (!req.body.password) {
    errResponseBody.message = "Password of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }
  //Validate email of the user
  if (!req.body.email) {
    errResponseBody.message = "Email of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }

  next();
};

const validateSigninRequest = async (req, res, next) => {
  if (!req.body.email) {
    errResponseBody.message = "No email provided for sign in";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }

  if (!req.body.password) {
    errResponseBody.message = "No password provided for sign in";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }

  next();
};

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      errResponseBody.message = "No token provided";
      return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      errResponseBody.message = "Token not verified";
      return res.status(STATUS.UNAUTHORISED).json(errResponseBody);
    }
    const user = await userService.getUserById(response.id);
    req.user = user.id;
    next();
  } catch (err) {
    if (err.name == "JsonWebTokenError") {
      errResponseBody.message = err.message;
      return res.status(STATUS.UNAUTHORISED).json(errResponseBody);
    }
    if (err.code == STATUS.NOT_FOUND) {
      errResponseBody.message = "User doesn't exists";
      return res.status(err.code).json(errResponseBody);
    }
    errResponseBody.message = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
};

const validateResetPasswordRequest = async (req, res, next) => {
  if (req.body.oldPassword) {
    errResponseBody.err = "Missing the old password in the request";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }

  if (req.body.newPassword) {
    errResponseBody.err = "Missing the new password in the request";
    return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
  }

  next();
};

const isAdmin = async (req, res, next) => {
  const user = await userService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.admin) {
    errResponseBody.err =
      "User is not an admin, cannot proceed with the request";
    return res.status(STATUS.UNAUTHORISED).json(errResponseBody);
  }
  next();
};

const isOwner = async (req, res, next) => {
  const user = await userService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.owner) {
    errResponseBody.err =
      "User is not an owner, cannot proceed with the request";
    return res.status(STATUS.UNAUTHORISED).json(errResponseBody);
  }
  next();
};

const isAdminOrOwner = async (req, res, next) => {
  const user = await userService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.admin && user.userRole !== USER_ROLE.owner) {
    const response = {
      error: {},
      data: {},
      message:
        "User is neither a owner nor an admin, cannot proceed with the request",
      success: false,
    };
    return res.status(STATUS.UNAUTHORISED).json(response);
  }
  next();
};

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  isAuthenticated,
  validateResetPasswordRequest,
  isAdmin,
  isOwner,
  isAdminOrOwner,
};
