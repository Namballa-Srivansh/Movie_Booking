const searchController = require('../controllers/search.controller');

module.exports = (app) => {
    app.get('/mba/api/v1/search', searchController.search);
}
