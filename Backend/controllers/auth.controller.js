const userService = require("../services/user.service");
const {
  successResponseBody,
  errResponseBody,
} = require("../utils/responsebody");

const signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Sucessfully Registered";
    return res.status(201).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errResponseBody.err = err.err;
      return res.status(err.code).json(errResponseBody);
    }
    errResponseBody.err = err;
    return res.status(500).json(errResponseBody);
  }
};

module.exports = {
  signup,
};
