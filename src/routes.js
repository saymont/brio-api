const express = require('express');

const routes = express.Router();

const SessionController = require('./controllers/SessionController');

routes.post('/login', SessionController.login);
routes.post('/register', SessionController.registerUser);
routes.post('/register/psychologist', SessionController.registerPsychologist);  

module.exports = routes;