const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryption = require('../util/EncryptionCTR');

const User = require('../models/User');
const Psychologist = require('../models/Psychologist');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                return res.status(400).json({ error: 'User does not exists' })
            }

            const psychologist = await Psychologist.findOne({
                where: { user_id: user.user_id }
            })

            bcrypt.compare(password, user.password, function (err, response) {
                if (response == true) {
                    return res.json({
                        user: { user, psychologist },
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
                password: hash,
                active: false

            });

            const userIdEmail = generateToken(user.user_id)
            // TODO send email -- função async sem await

            return res.json({ user });

        } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
        }

    },

    async confirmation(req, res) {
        const { confirmationToken } = req.params;

        try {
            confirmationToken = encryption.decrypt(confirmationToken);

            await User.update(
                { active: true },
                { where: confirmationToken },
            )

        } catch (err) {
            return res.status(400).json({ error: "User confirmation failed" });
        }

    }

}


function generateToken(id) {
    return jwt.sign({ id }, "secret", {
        expiresIn: 86400
    });
}


