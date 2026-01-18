const {errResponseBody} = require('../utils/response.util');

const validateTheatreCreateRequest = (req, res, next) => {

    if(!req.body.name) {
        errResponseBody.message = "The name of the theatre is not present in the request sent";
        return res.status(400).json(errResponseBody);
    }

    if(!req.body.city) {
        errResponseBody.message = "The city of the theatre is not present in the request sent";
        return res.status(400).json(errResponseBody);
    }

    if(!req.body.address) {
        errResponseBody.message = "The address of the theatre is not present in the request sent";
        return res.status(400).json(errResponseBody);
    }

    if(!req.body.pinCode) {
        errResponseBody.message = "The pinCode of the theatre is not present in the request sent";
        return res.status(400).json(errResponseBody);
    }

    next();

}

module.exports = {
    validateTheatreCreateRequest
};