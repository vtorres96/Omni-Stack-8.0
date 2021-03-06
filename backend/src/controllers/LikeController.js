const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { id } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(id);

    if (!targetDev) {
      return res.status(400).send({ error: "Developer not exists" });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[id];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit("match", targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit("match", loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
