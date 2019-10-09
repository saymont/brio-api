const express = require('express');

const routes = express.Router();

const SessionController = require('./controllers/SessionController');

// Sessions
routes.post('/sessions/login', SessionController.login);
routes.post('/sessions/register', SessionController.registerUser);
routes.post('/sessions/register/Psychologist', SessionController.registerPsychologist);  

module.exports = routes;