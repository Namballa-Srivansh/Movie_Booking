const User = require("../models/user.model");
const { USER_STATUS, USER_ROLE } = require("../utils/constants");
const { STATUS } = require("../utils/constants");

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

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw { err: "No user found for the given id", code: 404 };
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUserRoleOrStatus = async (data, userId) => {
  try {
    let updateQuery = {};

    if (data.userRole) updateQuery.userRole = data.userRole;
    if (data.userStatus) updateQuery.userStatus = data.userStatus;

    let response = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      throw {
        err: "No user found for the given id",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      throw {
        err: errors,
        code: STATUS.BAD_REQUEST,
      };
    }
    throw err;
  }
};

module.exports = {
  createUser,
  getUserByemail,
  getUserById,
  updateUserRoleOrStatus,
};
