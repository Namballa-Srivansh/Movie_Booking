const {STATUS, USER_ROLE, BOOKING_STATUS} = require("../utils/constants");
const {errResponseBody} = require("../utils/responsebody");
const ObjectId = require("mongoose").Types.ObjectId;
const theatreService = require("../services/theatre.service");
const userService = require("../services/user.service");

const validateBookingCreateRequest = async (req, res, next) => {
    // validate the theatre id presence
    if(!req.body.theatreId) {
        errResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate correct theatre id format
    if(!ObjectId.isValid(req.body.theatreId)) {
        errResponseBody.err = "Invalid theatreid Provided"
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // check if theatre exists in database
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre) {
        errResponseBody.err = "No theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errResponseBody);
    }

    // validate movie presence
    if(!req.body.movieId) {
        errResponseBody.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate correct movie id format
    if(!ObjectId.isValid(req.body.movieId)) {
        errResponseBody.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate if movie is running in the theatre or not ?
    if(!theatre.movies.includes(req.body.movieId)) {
        errResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errResponseBody);
    }

    // validate presence of timings
    if(!req.body.timings) {
        errResponseBody.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate no. of seats
    if(!req.body.noOfSeats) {
        errResponseBody.err = "No seats provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    next();
}

const canChangeStatus = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status !== BOOKING_STATUS.cancelled) {
        errResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errResponseBody)
    }
    next();
}

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus,
}