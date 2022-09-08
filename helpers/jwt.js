var jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, "test-socialight");
}
function decode(token) {
  return jwt.verify(token, "test-socialight");
}

module.exports = { generateToken, decode };
