const showController = require("../controllers/show.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");
const showMiddlewares = require("../middlewares/show.middlewares");

const routes = (app) => {
    app.post(
        "/mba/api/v1/shows",
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrOwner,
        showMiddlewares.validateCreateShowRequest,
        showController.create
    )

    app.get(
        "/mba/api/v1/shows",
        showController.getShows
    )

    app.delete(
        "/mba/api/v1/shows/:id",
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrOwner,
        showController.destroy
    )

    app.patch(
        "/mba/api/v1/shows/:id",
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrOwner,
        showMiddlewares.validateUpdateShowRequest,
        showController.update
    )
}

module.exports = routes