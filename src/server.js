require("dotenv/config");
const express = require("express");

const routes = require("./routes");

const mongoose = require("mongoose");
const cors = require("cors");

var Auth0Strategy = require("passport-auth0");
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Inicia o app
const app = express();

app.use(cookieParser());

// config express-session
var sess = {
    secret: process.env.AUTH0_SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if (app.get("env") === "production") {
    // If you are using a hosting provider which uses a proxy (eg. Heroku),
    // comment in the following app.set configuration command
    //
    // Trust first proxy, to prevent "Unable to verify authorization request state."
    // errors with passport-auth0.
    // Ref: https://github.com/auth0/passport-auth0/issues/70#issuecomment-480771614
    // Ref: https://www.npmjs.com/package/express-session#cookiesecure
    // app.set('trust proxy', 1);

    sess.cookie.secure = true; // serve secure cookies, requires https
}


app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

//app.use(flash());

// Rotas
app.use(cors());
app.use("/api", require("./routes.js"));
app.listen(process.env.PORT);
app.use(express.json());
app.use(routes);
