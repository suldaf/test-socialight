const { User } = require("../models");
const { decode } = require("../helpers/jwt");

const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.headers.token;
    const currentUser = decode(accessToken);
    const data = await User.findOne({ where: { name: currentUser.name } });
    if (data) {
      req.currentUser = currentUser;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
};

module.exports = { authenticate };
