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

module.exports = {
    create,
}