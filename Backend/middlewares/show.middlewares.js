const {STATUS} = require("../utils/constants")
const {errResponseBody} = require("../utils/responsebody")
const ObjectId = require("mongoose").Types.ObjectId
const Show = require("../models/show.model");

const validateCreateShowRequest = async (req, res, next)  => {
    // validate theatre id
    if(!req.body.theatreId) {
        errResponseBody.err = "No theatre provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    if(!ObjectId.isValid(req.body.theatreId)) {
        errResponseBody.err = "Invalid theatre id";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate movie presence
    if(!req.body.movieId) {
        errResponseBody.err = "No movie provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    if(!ObjectId.isValid(req.body.movieId)) {
        errResponseBody.err = "Invalid movie id";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate timing presence
    if(!req.body.timings) {
        errResponseBody.err = "No timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate noOfSeats prsence
    if(!req.body.noOfSeats) {
        errResponseBody.err = "No seat info provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // validate price presence
    if(!req.body.price) {
        errResponseBody.err = "No price information provided";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    // check if show already exists
    const existingShow = await Show.findOne({
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        timings: req.body.timings
    });

    if(existingShow) {
        errResponseBody.err = "A show with the same theatre, movie, and timing already exists";
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    next();
}

const validateUpdateShowRequest = async (req, res, next) => {
    if(req.body.theatreId || req.body.movieId) {
        errResponseBody.err = "We cannot update theatre or movie for an already added show"
        return res.status(STATUS.BAD_REQUEST).json(errResponseBody);
    }

    next();
}

module.exports = {
    validateCreateShowRequest,
    validateUpdateShowRequest
}