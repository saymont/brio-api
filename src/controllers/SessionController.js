const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/User");
const encryption = require("../util/EncryptionCTR");

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UserSchema.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "User does not exists" });
            }

            bcrypt.compare(password, user.password, function(err, response) {
                if (response == true) {
                    return res.json({
                        user: user,
                        token: generateToken(user.user_id)
                    });
                } else {
                    return res
                        .status(400)
                        .json({ error: "Incorrect password" });
                }
            });
        } catch (err) {
            return res.status(400).json({ error: "Login failed" });
        }
    },

    async registerUser(req, res) {
        const { name, email, password, cpf } = req.body;

        try {
            if (await UserSchema.findOne({ email })) {
                return res
                    .status(400)
                    .json({ error: "E-mail already registered" });
            }

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const user = await UserSchema.create({
                name,
                email,
                cpf,
                profile: "user",
                active: false,
                password: hash,
                password_changed_in: new Date(),
                psychologists_treatment: [],
                last_passwords: []
            });

            // TODO Email de Confirmação
            // const confirmationToken = encryption.encrypt(user._id);
            // TODO Separar em uma função separada
            // TODO send email with confirmationToken -- função async sem await

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
        }
    },

    async confirmation(req, res) {
        const { confirmationToken } = req.params;

        try {
            user_id = encryption.decrypt(confirmationToken);

            const user = await UserSchema.findById(user_id);

            if (!user) {
                res.status(400).json({ error: "User not found" });
            }

            user.active = true;

            user.save();

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: "User confirmation failed" });
        }
    }
};

function generateToken(id) {
    return jwt.sign({ id }, "secret", {
        expiresIn: 86400
    });
}
