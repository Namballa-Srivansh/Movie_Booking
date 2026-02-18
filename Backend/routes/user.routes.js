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
    "/mba/api/v1/user/verify",
    authMiddlewares.isAuthenticated,
    userController.verifyUser,
  )

  app.get(
    "/mba/api/v1/user/:id",
    authMiddlewares.isAuthenticated,
    userController.getById,
  );

  app.get(
    "/mba/api/v1/users",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdmin,
    userController.getAll,
  );
};

module.exports = routes;
