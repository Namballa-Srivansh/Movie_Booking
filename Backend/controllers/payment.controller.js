const paymentService = require("../services/payment.service");
const { BOOKING_STATUS, STATUS } = require("../utils/constants");
const { errResponseBody, successResponseBody } = require("../utils/responsebody");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const axios = require("axios")
const Theatre = require("../models/theatre.model");
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
        const user = await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        console.log(response);
        axios.post(process.env.NOTI_SERVICE + "/notiservice/api/v1/notifications", {
            subject: "Booking completed successfully",
            recipientEmails: [user.email],
            content: `Your booking ${movie.name} at ${theatre.name} for ${response.noOfSeats} seats on ${response.timings} is successful. Your booking id is ${response.id}`
        });
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

const getAllPayments = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the payments";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayments
}
