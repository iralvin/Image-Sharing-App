const pageNotFoundRouter = require('express').Router();
const pageNotFound = require('../controllers/pageNotFoundController');

pageNotFoundRouter.get('/*', pageNotFound);

module.exports = pageNotFoundRouter;
