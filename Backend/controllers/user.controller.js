const userService = require("../services/user.service");
const {
  errResponseBody,
  successResponseBody,
} = require("../utils/responsebody");
const { STATUS } = require("../utils/constants");

const getById = async (req, res) => {
  try {
    const response = await userService.getUserById(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched the user";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errResponseBody.err = err.err;
      return res.status(err.code).json(errResponseBody);
    }
    errResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
};

const update = async (req, res) => {
  try {
    const response = await userService.updateUserRoleOrStatus(
      req.body,
      req.params.id,
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the user";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    console.log(err);
    if (err.err) {
      errResponseBody.err = err.err;
      return res.status(err.code).json(errResponseBody);
    }
    errResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
};

const verifyUser = async (req, res) => {
  try {
    const response = await userService.getUserById(req.user);
    successResponseBody.data = response;
    successResponseBody.message = "User verified";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errResponseBody.err = err.err;
      return res.status(err.code).json(errResponseBody);
    }
    errResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
  }
};

module.exports = {
  update,
  getById,
  verifyUser,
};
