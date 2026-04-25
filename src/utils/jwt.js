const jwt = require("jsonwebtoken");
const ms = require("ms");
const AppError = require("./appError");
const STATUS_CODE = require("../constants/statusCode");

const generateToken = ({ payload, secret, expiresIn }) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  const expiredAt = Date.now() + ms(expiresIn);
  return { token, expiredAt };
};

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new AppError(error.message, STATUS_CODE.UNAUTHORIZED);
  }
};

module.exports = { generateToken, verifyToken };
