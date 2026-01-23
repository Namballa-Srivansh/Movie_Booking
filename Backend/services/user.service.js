const User = require("../models/user.model");

const createUser = async (data) => {
  try {
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
