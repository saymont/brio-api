const User = require('../models/User');

module.exports = {
  async show(req, res) {
    try {
      const { user_id } = req;

      const user = await User.findOne({
        where: { user_id },
      });

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Can't get user information" });
    }
  }
}
