const Sequelize = require('sequelize');

const db = require('../services/database');

const Psychologist = db.define('psychologists', {
    user_id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()')
    },
    administrator: {
        type: Sequelize.BOOLEAN,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    crp: {
        type: Sequelize.STRING
    }
});


module.exports = Psychologist;