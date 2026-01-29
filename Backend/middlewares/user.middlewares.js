const { errResponseBody } = require("../utils/responsebody");

const validateUpdateUserRequest = (req, res, next) => {
  if (!(req.body.userRole || req.body.userStatus)) {
    errResponseBody.message =
      "Malformed request, please send atleast one parameter";
    return res.status(400).json(errResponseBody);
  }

  next();
};

module.exports = {
  validateUpdateUserRequest,
};
