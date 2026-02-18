const Booking = require("../models/booking.model");
const { STATUS } = require("../utils/constants")
const Show = require("../models/show.model")

const createBooking = async (data) => {
    try {
        const show = await Show.findOne({
            movieId: data.movieId,
            theatreId: data.theatreId,
            timings: data.timings
        });

        // Time Validation
        const showDate = data.bookingDate ? new Date(data.bookingDate) : new Date(); // Use provided date or today
        const currentTime = new Date();

        // Parse show timing
        const timingParts = show.timings.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timingParts) {
            let hours = parseInt(timingParts[1]);
            const minutes = parseInt(timingParts[2]);
            const period = timingParts[3];

            if (period === "PM" && hours !== 12) hours += 12;
            if (period === "AM" && hours === 12) hours = 0;

            showDate.setHours(hours, minutes, 0, 0);
        }

        if (showDate < currentTime) {
            throw {
                err: "Cannot book tickets for a past show",
                code: STATUS.UNPROCESSABLE_ENTITY
            }
        }

        // Check if seats are available
        if (data.seats && data.seats.length > 0) {
            if (!show.bookedSeats) show.bookedSeats = [];
            const unavailableSeats = data.seats.filter(seat => show.bookedSeats.includes(seat));
            if (unavailableSeats.length > 0) {
                throw {
                    err: `Seats ${unavailableSeats.join(", ")} are already booked`,
                    code: STATUS.UNPROCESSABLE_ENTITY
                }
            }
            // Add new seats to bookedSeats
            show.bookedSeats.push(...data.seats);
            await show.save();
        }

        // If seats are selected, trust the totalCost from frontend (or we could recalculate if we had the logic here)
        // Otherwise, fallback to legacy calculation
        if (!data.seats || data.seats.length === 0) {
            data.totalCost = data.noOfSeats * show.price;
        }

        const response = await Booking.create(data);
        return response.populate('movieId theatreId');
    } catch (error) {
        console.log(error);
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
}

const updateBooking = async (data, bookingId) => {
    try {
        const response = await Booking.findByIdAndUpdate(bookingId, data, {
            new: true,
            runValidators: true
        });
        if (!response) {
            throw {
                err: "No booking found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if (error.name = "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
        }
        console.log(error);
        throw error;
    }
}

const getBookings = async (data) => {
    try {
        const response = await Booking.find(data).populate('movieId theatreId');
        return response
    } catch (error) {
        throw error;
    }

}

const getAllBookings = async () => {
    try {
        const response = await Booking.find().populate('movieId theatreId userId');
        return response
    } catch (error) {
        throw error;
    }

}

const getBookingsById = async (id, userId) => {
    try {
        const response = await Booking.findById(id).populate('movieId theatreId');
        if (!response) {
            throw {
                err: "No booking records found for the id",
                code: STATUS.NOT_FOUND
            }
        }
        if (response.userId != userId) {
            throw {
                err: "Not able to access the booking",
                code: STATUS.UNAUTHORISED
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings,
    getBookingsById,
}