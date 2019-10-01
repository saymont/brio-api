require('dotenv/config');
const express = require("express");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_TEST,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Erro: ' + err))

// Inicia o app
const app = express();

// Rotas
app.use("/api", require("./src/routes.js"));
app.listen(process.env.PORT);