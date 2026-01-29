const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middlewares');
const authMiddleware = require("../middlewares/auth.middlewares")

const routes = (app) => {
    app.post(
        "/mba/api/v1/theatres", 
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    app.delete(
        "/mba/api/v1/theatres/:id",
        authMiddleware.isAuthenticated,
        theatreController.deleteTheatre
    );

    app.get(
        "/mba/api/v1/theatres/:id",
        theatreController.getTheatre
    );

    app.get(
        "/mba/api/v1/theatres",
        theatreController.getAllTheatres
    )

    app.patch(
        "/mba/api/v1/theatres/:id",
        theatreController.updateTheatre
    )

    app.patch(
        "/mba/api/v1/theatres/:id/movies",
        theatreMiddleware.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );
    
    app.get(
        "/mba/api/v1/theatres/:id/movies",
        theatreController.getMovies
    );

    app.get(
        "/mba/api/v1/theatres/:theatreId/movies/:movieId",
        theatreController.checkMovie
    )
}

module.exports = routes;