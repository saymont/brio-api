require('dotenv/config');
const express = require("express");
const { Client } = require('pg');

// Inicia o app
const app = express();

// Iniciando DB
const client = new Client({
    user: process.env.user,
    password: process.env.password,
    host: process.env.brioDB,
    port: 5432,
    database: process.env.database
});

client.connect()
    .then(() => console.log("Connected sucessfuly"))
    .catch(e => console.log)
    .finally(() => client.end())

// Rotas
app.use("/api", require("./src/routes.js"));
app.listen(3001);