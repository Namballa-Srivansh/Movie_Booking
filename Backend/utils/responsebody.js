// This object will be used as as a template for building error Responses

const errResponseBody = {
    error: {},
    data: {},
    message: "Something went wrong, cannot process your request",
    success: false
}

// This object will be used as as a template for building success Responses

const successResponseBody = {
    error: {},
    data: {},
    message: "Sucessfully processed your request",
    success: true
}

module.exports = {
    errResponseBody,
    successResponseBody
}