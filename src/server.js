require('dotenv/config');
const express = require("express");

const routes = require('./routes');

require('./database');

// Inicia o app
const app = express();

// Rotas
app.use("/api", require("./routes.js"));
app.listen(process.env.PORT);
app.use(express.json());
app.use(routes);