require('dotenv/config');
const express = require("express");

const db = require('./services/database');

const routes = require('./routes');


db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Erro: ' + err))

// Inicia o app
const app = express();

// Rotas
app.use("/api", require("./routes.js"));
app.listen(process.env.PORT);
app.use(express.json());
app.use(routes);