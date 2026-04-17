const dotenv = require("dotenv");
dotenv.config();
const { AUTH_MESSAGES } = require("../constants/messages");
const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/jwt");

const isAuthorized = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }
};

module.exports = {
  isAuthorized,
};
