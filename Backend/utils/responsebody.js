const errResponseBody = {
    error: {},
    data: {},
    message: "Something went wrong, cannot process your request",
    success: false
}

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