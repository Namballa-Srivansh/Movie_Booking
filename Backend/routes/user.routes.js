const userController = require("../controllers/user.controller");
const userMiddlewares = require("../middlewares/user.middlewares");
const authMiddlewares = require("../middlewares/auth.middlewares");

const routes = (app) => {
  app.patch(
    "/mba/api/v1/user/:id",
    authMiddlewares.isAuthenticated,
    userMiddlewares.validateUpdateUserRequest,
    authMiddlewares.isAdmin,
    userController.update,
  );
};

module.exports = routes;
