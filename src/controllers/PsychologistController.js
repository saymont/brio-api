const UserSchema = require("../models/User");
const mongoose = require("mongoose");

module.exports = {
    async confirmPsychologistRegistration(req, res) {
        const { admin_id } = req.params;
        const { user_id, crp } = req.body;

        try {
            const user = await UserSchema.findById(user_id);

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            if (user.psychologist.approved == true) {
                return res
                    .status(400)
                    .json({ error: "User is already a psychologist" });
            }

            user.active = true;
            user.profile = "psychologist";

            user.psychologist.crp = crp;
            user.psychologist.approved = true;
            user.psychologist.approved_in = new Date();

            user.save();

            return res.json(user);
        } catch (err) {
            return res
                .status(400)
                .json({ error: admin_id + "Psychologist confirmation failed" });
        }
    },

    async requestPsychologistRegistration(req, res) {
        const { user_id } = req.params;
        const { crp } = req.body;

        try {
            // TODO envia email para o Briosense para a confirmação do crp
            // TODO Envia notificação para os perfis dos administradores -> Socket.io
            return res
                .status(400)
                .json({ error: "user_id: " + user_id + " crp: " + crp });
        } catch (err) {
            return res
                .status(400)
                .json({ error: "Psychologist registration failed" });
        }
    }
};
