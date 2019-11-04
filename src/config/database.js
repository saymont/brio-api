require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: process.env.TINYTURTLE_TEST,
    username: process.env.TINYTURTLE_USER,
    password: process.env.TINYTURTLE_PASSWORD,
    database: process.env.TINYTURTLE_DATABASE,
    define: {
        timestamps: true,
        underscored: true,
    },
};