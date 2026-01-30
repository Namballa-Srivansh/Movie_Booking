const Booking = require("../models/booking.model");
const {STATUS} = require("../utils/constants")

const createBooking = async (data) => {
    try {
        const response = await Booking.create(data);
        return response;
    } catch(err) {
        console.log(err)
        if(err.name == "ValidationError") {
            let error = {};
            Object.keys(err.errors).forEach(key => {
                error[key] = err.errors[key].message;
            })
            throw {error: err, code: STATUS.UNPROCESSABLE_ENTITY}
        }
        throw err
    }
}

module.exports = {
    createBooking,
}