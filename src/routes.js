const express = require('express');

const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const PsychologistController = require('./controllers/PsychologistController')
const DashboardController = require('./controllers/DashboardController');

routes.post('/api/v1/login', SessionController.login);
routes.post('/api/v1/register', SessionController.registerUser);
routes.post('/api/v1/:user_id/psychologist', PsychologistController.requestRegisterPsychologist);

// Rota apenas para testar o auth
routes.get('/api/v1/dashboard', authMiddleware, DashboardController.show);

module.exports = routes;