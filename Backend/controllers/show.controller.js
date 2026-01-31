const showService = require("../services/show.service");
const {STATUS} = require("../utils/constants");
const { successResponseBody, errResponseBody } = require("../utils/responsebody");

const create = async (req, res) => {
    try {
        const response = await showService.createShow(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the show";
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch(error) {
        if(error.err) {
            errResponseBody.err = error.err;
            return res.status(error.code).json(errResponseBody);
        }
        errResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errResponseBody);
    }
}

const getShows = async (req, res) => {
    try {
        const response = await showService.getShows(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "SuccesFully fetched the movie shows";
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
    getShows,
}