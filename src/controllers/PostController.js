require("dotenv/config");
const WPAPI = require("wpapi");

const wp = new WPAPI({ endpoint: process.env.ENDPOINT });

module.exports = {
    async getPosts(req, res) {
        wp.posts()
            .get()
            .then(function(data) {
                return res.json(data);
            })
            .catch(function(err) {
                return res.status(400).json({ error: "Failed to get posts" });
            });
    }
};
