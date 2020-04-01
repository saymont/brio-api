require("dotenv/config");
const express = require("express");
const routes = express.Router();
var passport = require("passport");
var secured = require("./lib/middleware/secured");
var url = require('url');
var util = require('util');
var querystring = require('querystring');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const PostController = require("./controllers/PostController");
const DashboardController = require("./controllers/DashboardController");


// User
routes.get("/api/v1/dashboardUser", secured(), DashboardController.user);

// Blog
routes.get("/api/v1/posts", PostController.getPosts);


// Auth
routes.get("/", function (req, res, next) {
    return res.json({ OK: "1" });
});

routes.get(
    "/api/v1/login",
    passport.authenticate("auth0", {
        scope: "openid email profile"
    })
);

routes.get("/api/v1/callback", function (req, res, next) {
    passport.authenticate("auth0", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/api/v1/login");
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || "/api/v1/dashboardUser");
        });
    })(req, res, next);
});

// Perform session logout
routes.get("/api/v1/logout", (req, res) => {
    req.logout();
    var returnTo = req.protocol + "://" + req.hostname;
    var port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += ":" + port;
    }

    var logoutURL = new url.URL(
        util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
    );
    var searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
});

// Set up Auth0 configuration
const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE
  };

// checkJwt
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
  
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
  });

// Define an endpoint that must be called with an access token
routes.get("/api/external", checkJwt, (req, res) => {
    res.send({
      msg: "Your Access Token was successfully validated!"
    });
  });

module.exports = routes;
