const express = require("express");

const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

const PostController = require("./controllers/PostController");

const SessionController = require("./controllers/SessionController");
const PsychologistController = require("./controllers/PsychologistController");
const DashboardController = require("./controllers/DashboardController");
var passport = require("passport");
var secured = require("./lib/middleware/secured");

routes.get("/api/v1/posts", PostController.getPosts);

// User
routes.get("/api/v1/dashboardUser", secured(), DashboardController.user);

// Auth
routes.get("/", function(req, res, next) {
    return res.json({ ain: "1" });
});

routes.get(
    "/api/v1/login",
    passport.authenticate("auth0", {
        scope: "openid email profile"
    })
);

routes.get("/api/v1/callback", function(req, res, next) {
    passport.authenticate("auth0", function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/api/v1/login");
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || "/api/v1/dashboardUser");
        });
    })(req, res, next);
});

module.exports = routes;
