const { User } = require("../models");

const adminAuthorize = async (req, res, next) => {
  const userId = req.currentUser.id;
  const data = await User.findOne({ where: { id: userId } });
  if (data && data.role == "admin") {
    next();
  } else {
    return res.json({
      message: "Not Authorized",
      status: 401,
    });
  }
};
const initiatorAuthorize = async (req, res, next) => {
  const userId = req.currentUser.id;
  const data = await User.findOne({ where: { id: userId } });
  if (data && data.role == "initiator") {
    next();
  } else {
    return res.json({
      message: "Not Authorized",
      status: 401,
    });
  }
};
const participantAuthorize = async (req, res, next) => {
  const userId = req.currentUser.id;
  const data = await User.findOne({ where: { id: userId } });
  if (data && data.role == "participant") {
    next();
  } else {
    return res.json({
      message: "Not Authorized",
      status: 401,
    });
  }
};

module.exports = { adminAuthorize, initiatorAuthorize, participantAuthorize };
