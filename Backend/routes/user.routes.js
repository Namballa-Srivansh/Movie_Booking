const userController = require("../controllers/user.controller");
const userMiddlewares = require("../middlewares/user.middlewares");
const authMiddlewares = require("../middlewares/auth.middlewares");

const routes = (app) => {
  app.patch(
    "/mba/api/v1/user/:id",
    authMiddlewares.isAuthenticated,
    userMiddlewares.validateUpdateUserRequest,
    userController.update,
  );

  app.get(
    "/mba/api/v1/user",
    authMiddlewares.isAuthenticated,
    userController.getByEmail,
  );

  app.post(
    "/mba/api/v1/user/verify",
    userController.verifyUser,
  )

  app.get(
    "/mba/api/v1/user/:id",
    authMiddlewares.isAuthenticated,
    userController.getById,
  );
};

module.exports = routes;
