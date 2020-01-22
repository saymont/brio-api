require('dotenv/config');
const express = require("express");

const routes = require('./routes');

const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


// Inicia o app
const app = express();

// Rotas
app.use(cors());
app.use("/api", require("./routes.js"));
app.listen(process.env.PORT);
app.use(express.json());
app.use(routes);