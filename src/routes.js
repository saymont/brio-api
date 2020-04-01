require("dotenv/config");
const express = require("express");
const routes = express.Router();
var passport = require("passport");
var secured = require("./lib/middleware/secured");
var url = require('url');
var util = require('util');
var querystring = require('querystring');

const PostController = require("./controllers/PostController");
const DashboardController = require("./controllers/DashboardController");
const AuthController = require("./controllers/AuthController");

const checkJwt = require("./lib/middleware/checkJwt");

// Define an endpoint that must be called with an access token
routes.get("/api/external", checkJwt, AuthController.validateUser);

// User
routes.get("/api/v1/dashboardUser", secured(), DashboardController.user);

// Blog
routes.get("/api/v1/posts", PostController.getPosts);

module.exports = routes;
