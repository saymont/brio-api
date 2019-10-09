const bcrypt = require('bcrypt');

const User = require('../models/User');
const Psychologist = require('../models/Psychologist');


module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: 'User does not exists' })
        }

        bcrypt.compare(password, user.password, function (err, response) {
            if (response == true) {
                return res.json(user);
            } else {
                return res.status(400).json({ error: 'Incorrect password' })
            }
        });
    },

    async registerUser(req, res) {

        const { name, email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (user) {
            return res.status(400).json({ error: 'E-mail already registered' })
        } else {

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const user = await User.create({
                name,
                email,
                administrator: false,
                password: hash
            });

            return res.json({ user });
        }

    },

    async registerPsychologist(req, res) {
        const { name, email, password, crp } = req.body;

        const psychologist = await Psychologist.findOne({
            where: { email },
        });

        if (psychologist) {
            return res.status(400).json({ error: 'E-mail already registered' })
        } else {

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const psychologist = await Psychologist.create({
                name,
                email,
                crp,
                administrator: false,
                password: hash
            })

            return res.json({ psychologist });
        }

    }

}


