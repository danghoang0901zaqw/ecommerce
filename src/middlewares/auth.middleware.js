const dotenv = require("dotenv");
dotenv.config();
const { Op } = require("sequelize");
const { AUTH_MESSAGES } = require("../constants/messages");
const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/jwt");
const db = require("../databases/models");

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

const hasRole =
  (...roles) =>
  async (req, res, next) => {
    const { userId } = req.user;
    const userRole = await db.UserRole.findOne({
      include: {
        model: db.Role,
        where: { roleName: { [Op.in]: roles } },
      },
      where: { userId },
    });
    if (!userRole) {
      throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.FORBIDDEN);
    }
    next();
  };

const hasPermission =
  (...permissions) =>
  async (req, res, next) => {
    const { userId } = req.user;
    const [userPermission, rolePermission] = await Promise.all([
      db.UserPermission.findOne({
        include: {
          model: db.Permission,
          where: { permissionName: { [Op.in]: permissions } },
        },
        where: { userId },
      }),
      db.UserRole.findOne({
        include: {
          model: db.Role,
          include: {
            model: db.RolePermission,
            include: {
              model: db.Permission,
              where: { permissionName: { [Op.in]: permissions } },
            },
            required: true,
          },
          required: true,
        },
        where: { userId },
      }),
    ]);
    if (!userPermission && !rolePermission) {
      throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.FORBIDDEN);
    }
    next();
  };

module.exports = {
  isAuthorized,
  hasRole,
  hasPermission,
};
