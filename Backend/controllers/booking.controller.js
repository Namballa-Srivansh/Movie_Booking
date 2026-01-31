const {STATUS} = require("../utils/constants")
const {successResponseBody, errResponseBody} = require("../utils/responsebody")
const bookingService = require("../services/booking.service")

const create = async (req, res) => {
    try {
        const userId = req.user;
        const response = await bookingService.createBooking({ ...req.body, userId });
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch(err) {
        console.log(err)
        if(err.err) {
            errResponseBody.err = err.err;
            return res.status(err.code).json(errResponseBody)
        }
        errResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody)
    }
}

const update = async (req, res) => {
    try {
        const response = await bookingService.updateBooking(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the booking";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(error) {
        if(error.err) {
            errResponseBody.err = error.err;
            return res.status(error.code).json(errResponseBody);
        }
        errResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
    }
}

module.exports = {
    create,
    update,
}