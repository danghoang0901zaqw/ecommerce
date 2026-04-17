const jwt = require("jsonwebtoken");
const ms = require("ms");

const generateToken = ({ payload, secret, expiresIn }) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  const expiredAt = Date.now() + ms(expiresIn);
  return { token, expiredAt };
};

const verifyToken = (token, secret) => jwt.verify(token, secret);

module.exports = { generateToken, verifyToken };
