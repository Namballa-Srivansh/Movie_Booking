const User = require("../models/user.model");
const { USER_STATUS, USER_ROLE } = require("../utils/constants");

const createUser = async (data) => {
  try {
    if (!data.userRole || data.userRole == USER_ROLE.customer) {
      if (data.userStatus && data.userStatus !== USER_STATUS.approved) {
        throw {
          err: "We cannot set any other status for customer",
          code: 400,
        };
      }
    }
    if (data.userRole && data.userRole !== USER_ROLE.customer) {
      data.userStatus = USER_STATUS.pending;
    }
    const response = await User.create(data);
    return response;
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      throw { err: errors, code: 422 };
    }
    throw err;
  }
};

module.exports = {
  createUser,
};
