const UserSchema = require('../models/User');


module.exports = {
    async confirmRegister(req, res) {
        const { admin_id } = req.params;
        const { user_id, crp } = req.body;

        try {

            const user = await UserSchema.findById({ user_id });

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            if (user.psychologist) {
                return res.status(400).json({ error: "User is already a psychologist" });
            }


            user.psychologist.crp = crp;
            user.psychologist.approvedBy = admin_id;
            user.active = true;

            user.save();

            return res.json(user);

        } catch (err) {
            return res.status(400).json({ error: "Psychologist confirmation failed" });
        }
    },

    async requestRegisterPsychologist(req, res) {
        const { user_id } = req.params;
        const { crp } = req.body;

        try {
            // TODO envia email para o Briosense para a confirmação do crp
            // TODO Envia notificação para os perfis dos administradores -> Socket.io
            return res.status(501).json({ error: "501 Not Implemented" });
        } catch (err) {
            return res.status(400).json({ error: "Psychologist registration failed" });
        }
    }

}