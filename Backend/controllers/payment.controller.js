const paymentService = require("../services/payment.service");
const { BOOKING_STATUS, STATUS } = require("../utils/constants");
const { errResponseBody, successResponseBody } = require("../utils/responsebody");

const create = async (req, res) => {
    try {
        const response = await paymentService.createPayment(req.body);
        if (response.status == BOOKING_STATUS.expired) {
            errResponseBody.err = 'The payment took more than 5 minutes to get processed, hence you booking got expired, please try again';
            errResponseBody.data = response;
            return res.status(STATUS.GONE).json(errResponseBody);
        }
        if (response.status == BOOKING_STATUS.cancelled) {
            errResponseBody.err = 'The payment failed due to some reason, booking was not successfull, please try again';
            errResponseBody.data = response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errResponseBody.err = error.err;
            return res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
        }
        errResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
    }
}

const getPaymentDetailsById = async (req, res) => {
    try {
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Payment details fetched successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errResponseBody.err = error.err;
            return res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
        }
        errResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
    }
}
module.exports = {
    create,
    getPaymentDetailsById,
}
