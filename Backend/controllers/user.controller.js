const userService = require("../services/user.service");
const {errResponseBody, successResponseBody} = require("../utils/responsebody");

const update = async (req, res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the user";
        return res.status(200).json(successResponseBody);
    } catch(err) {
        console.log(err)
        if(err.err) {
            errResponseBody.err = err.err;
            return res.status(err.code).json(errResponseBody);
        }
        errResponseBody.err = err;
        return res.status(500).json(errResponseBody)
    }
}

module.exports = {
    update,
}