const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require("../models/User");
const Psychologist = require("../models/Psychologist");

const connection = new Sequelize(dbConfig);

User.init(connection);
Psychologist.init(connection);

User.associate(connection.models);
Psychologist.associate(connection.models);

module.exports = connection;