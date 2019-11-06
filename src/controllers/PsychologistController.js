const Psychologist = require('../models/Psychologist');
const User = require('../models/User');


module.exports = {
    async register(req, res) {
        const { user_id } = req.params;
        const { crp } = req.body;

        try {

            const user = await User.findByPk(user_id, {
                include: { association: "psychologist" }
            });

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            if (user.psychologist) {
                console.log(user)
                return res.status(400).json({ error: "User is already a psychologist" });
            }

            const psychologist = await Psychologist.create({
                crp,
                user_id
            });

            return res.json({ psychologist });

        } catch (err) {
            return res.status(400).json({ error: err + "Psychologist registration failed" });
        }

    },
}