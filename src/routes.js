const express = require("express");

const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

const PostController = require("./controllers/PostController");

const SessionController = require("./controllers/SessionController");
const PsychologistController = require("./controllers/PsychologistController");
const DashboardController = require("./controllers/DashboardController");

routes.get("/api/v1/posts", PostController.getPosts);

routes.post("/api/v1/login", SessionController.login);
routes.post("/api/v1/register", SessionController.registerUser);
routes.post(
    "/api/v1/:user_id/psychologist",
    PsychologistController.requestPsychologistRegistration
);
routes.post(
    "/api/v1/:user_id/confirmPsychologist",
    PsychologistController.confirmPsychologistRegistration
);

// Rota apenas para testar o auth
routes.get("/api/v1/dashboard", authMiddleware, DashboardController.show);

module.exports = routes;
