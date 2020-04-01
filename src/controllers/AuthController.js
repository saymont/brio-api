module.exports = {
    // TODO Validar o wordpress
    async validateUser(req, res) {

        const { } = req.body;

        try {
            return res.status(200).json({ msg: "Your Access Token was successfully validated!" })

        } catch (err) {
            return res.status(400).json({ error: "Login failed" });
        }
    },
}