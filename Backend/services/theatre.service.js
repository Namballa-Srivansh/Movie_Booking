const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
    try {
        console.log("Received data for theatre creation:", data);
        // Remove _id if present to ensure new document creation
        delete data._id;
        console.log("Data after removing _id:", data);
        const response = await Theatre.create(data);
        console.log("Created theatre:", response);
        return response;
    } catch (err) {
        if(err.name ==="ValidationError") {
            let err = {};
            Object.keys(err.errors).forEach((key) => {
                err[key] = err.errors[key].message;
            });
            return {err: err, code: 422}
        }
        if (err.code === 11000) {
            return {err: {name: "Theatre with this name already exists"}, code: 409}
        }
        console.log("Error in creating theatre", err);
        throw err;
    }
}

module.exports = {
    createTheatre
}