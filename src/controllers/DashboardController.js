const User = require("../models/User");

module.exports = {
    async user(req, res) {
        const { _raw, _json, ...userProfile } = req.user;
        return res.json(userProfile);
    },
};
