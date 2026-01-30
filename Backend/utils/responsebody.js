// Factory functions that create fresh response objects for each use

const getErrorResponseBody = () => ({
  error: {},
  data: {},
  message: "Something went wrong, cannot process your request",
  success: false,
});

const getSuccessResponseBody = () => ({
  error: {},
  data: {},
  message: "Sucessfully processed your request",
  success: true,
});

// Keep old exports for backward compatibility
const errResponseBody = {
  error: {},
  data: {},
  message: "Something went wrong, cannot process your request",
  success: false,
};

const successResponseBody = {
  error: {},
  data: {},
  message: "Sucessfully processed your request",
  success: true,
};

module.exports = {
  errResponseBody,
  successResponseBody,
  getErrorResponseBody,
  getSuccessResponseBody,
};
