const { STATUS } = require("../utils/constants");
const { errResponseBody } = require("../utils/responsebody");
const ObjectId = require("mongoose").Types.ObjectId;

const verifyPaymentCreateRequest = (req, res, next) => {
    // validate booking id presence
    if (!req.body.bookingId) {
        errResponseBody.err = "No booking id recieved"
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }
    // validate booking id format
    if (!ObjectId.isValid(req.body.bookingId)) {
        errResponseBody.err = "Invalid booking id"
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }
    // validate amount presence
    if (!req.body.amount) {
        errResponseBody.err = "No amount sent"
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }


    next();
}

module.exports = {
    verifyPaymentCreateRequest
}