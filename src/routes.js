const express = require('express');

const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const DashboardController = require('./controllers/DashboardController');

routes.post('/login', SessionController.login);
routes.post('/register', SessionController.registerUser);
routes.post('/register/psychologist', SessionController.registerPsychologist); 

routes.use(authMiddleware);

routes.get('/dashboard', DashboardController.show);

module.exports = routes;