const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/User');
const Psychologist = require('../models/Psychologist');


module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(400).json({ error: 'User does not exists' })
            }

            bcrypt.compare(password, user.password, function (err, response) {
                if (response == true) {
                    return res.json({
                        user,
                        token: generateToken(user.user_id)
                    });
                } else {
                    return res.status(400).json({ error: 'Incorrect password' })
                }
            });
        } catch (err) {
            return res.status(400).json({ error: "Login failed" });
        }
    },

    async registerUser(req, res) {

        const { name, email, password, cpf } = req.body;

        try {
            if (await User.findOne({
                where: { email },
            })) {
                return res.status(400).json({ error: 'E-mail already registered' })
            }

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const user = await User.create({
                name,
                email,
                administrator: false,
                cpf,
                password: hash
            });

            return res.json({ user });
        } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
        }

    },

    async registerPsychologist(req, res) {
        const { name, email, password, cpf, crp } = req.body;

        try {
            if (await Psychologist.findOne({
                where: { email },
            })) {
                return res.status(400).json({ error: 'E-mail already registered' })
            }

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const psychologist = await Psychologist.create({
                name,
                email,
                cpf,
                crp,
                administrator: false,
                password: hash
            });

            return res.json({ psychologist });

        } catch (err) {
            return res.status(400).json({ error: "Psychologist registration failed" });
        }
    },
}

function generateToken(id) {
    return jwt.sign({ id }, "secret", {
        expiresIn: 86400
    });
}


