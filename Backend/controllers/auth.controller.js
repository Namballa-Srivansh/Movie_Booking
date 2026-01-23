const userService = require("../services/user.service");
const {successResponseBody, errResponseBody} = require("../utils/responsebody");

const signup = async (req, res) => {
    try {
        const response = await userService.createUser(req.body);
        // if(!response) {
        //     errResponseBody.err = response.err;
        //     errResponseBody.message = "Singnup failed"
        //     return res.status(402).json(errResponseBody)
        // }
        successResponseBody.data = response;
        successResponseBody.message = "Sucessfully Registered";
        return res.status(201).json(successResponseBody)
    } catch(err) {
        errResponseBody.err = console.error();
        ;
        return res.status(500).json(errResponseBody)
    }
}

module.exports = {
    signup,
}