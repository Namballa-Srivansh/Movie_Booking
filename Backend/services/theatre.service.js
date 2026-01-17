const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (err) {
        console.log("Error in creating theatre", err);
        throw err;
    }
}

module.exports = {
    createTheatre
}