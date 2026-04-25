const dotenv = require("dotenv");
const db = require("../databases/models");
dotenv.config();

const { AUTH_MESSAGES } = require("../constants/messages");
const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");
const { generateToken, verifyToken } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/password");
const { TOKEN_TYPE } = require("../constants/enum");
class AuthServices {
  async isExistedEmail(email) {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    return !!user;
  }
  async signUp({ email, password, firstName, lastName }) {
    const isExistedEmail = await this.isExistedEmail(email);
    if (isExistedEmail) {
      throw new AppError(AUTH_MESSAGES.EMAIL_EXISTS, STATUS_CODE.BAD_REQUEST);
    }
    const hashedPassword = await hashPassword(password);
    const user = await db.User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const { password: passwordUser, ...userData } = user.toJSON();
    return userData;
  }
  async signIn({ email, password }) {
    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Role,
          as: "roles",
          attributes: ["roleId", "roleName"],
          through: { attributes: [] },
          include: [
            {
              model: db.Permission,
              as: "permissions",
              attributes: ["permissionId", "permissionName"],
              through: { attributes: [] },
            },
          ],
        },
        {
          model: db.Permission,
          as: "permissions",
          attributes: ["permissionId", "permissionName"],
          through: { attributes: [] },
        },
      ],
    });
    const { password: passwordUser, ...userData } = user.toJSON();
    const isPasswordValid = await comparePassword(password, passwordUser);
    if (!user || !isPasswordValid) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        STATUS_CODE.BAD_REQUEST,
      );
    }
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        payload: { userId: userData.userId },
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      }),
      generateToken({
        payload: { userId: userData.userId },
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);
    await db.Token.create({
      userId: userData.userId,
      token: refreshToken.token,
      type: TOKEN_TYPE.REFRESH_TOKEN,
      expiredAt: new Date(refreshToken.expiredAt),
    });
    return {
      ...userData,
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(email) {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError(AUTH_MESSAGES.EMAIL_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const forgotPasswordToken = generateToken({
      payload: { userId: user.userId },
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
    });
    await db.Token.create({
      userId: user.userId,
      token: forgotPasswordToken.token,
      type: TOKEN_TYPE.RESET_PASSWORD,
      expiredAt: new Date(forgotPasswordToken.expiredAt),
    });
    return true;
  }

  async verifyForgotPasswordToken(token) {
    const tokenRecord = await db.Token.findOne({
      where: {
        token,
        type: TOKEN_TYPE.RESET_PASSWORD,
      },
    });
    if (!tokenRecord) {
      throw new AppError(AUTH_MESSAGES.TOKEN_EXPIRED, STATUS_CODE.UNAUTHORIZED);
    }
    const now = new Date();
    if (tokenRecord.expiredAt < now) {
      await tokenRecord.destroy();
      throw new AppError(AUTH_MESSAGES.TOKEN_EXPIRED, STATUS_CODE.UNAUTHORIZED);
    }
    return true;
  }

  async resetPassword({ token, password }) {
    const decode = verifyToken(token, process.env.JWT_SECRET);
    const hashedPassword = await hashPassword(password);
    await db.User.update(
      { password: hashedPassword, updatedAt: new Date() },
      { where: { userId: decode.userId } },
    );
    return true;
  }

  async sendVerifyAccount(userId) {
    const verifyToken = generateToken({
      payload: { userId },
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_VERIFY_EMAIL_EXPIRES_IN,
    });
    await db.Token.create({
      userId,
      token: verifyToken.token,
      type: TOKEN_TYPE.VERIFY_EMAIL,
      expiredAt: new Date(verifyToken.expiredAt),
    });
    return true;
  }

  async verifyAccount(token) {
    const tokenRecord = await db.Token.findOne({
      where: {
        token,
        type: TOKEN_TYPE.VERIFY_EMAIL,
      },
    });
    if (!tokenRecord) {
      throw new AppError(AUTH_MESSAGES.TOKEN_EXPIRED, STATUS_CODE.UNAUTHORIZED);
    }
    if (tokenRecord.expiredAt < new Date()) {
      await tokenRecord.destroy();
      throw new AppError(AUTH_MESSAGES.TOKEN_EXPIRED, STATUS_CODE.UNAUTHORIZED);
    }
    await db.User.update(
      { verifiedAt: new Date() },
      { where: { userId: tokenRecord.userId } },
    );
    await tokenRecord.destroy();
    return true;
  }

  async signOut({ userId, refreshToken }) {
    const record = await db.Token.findOne({
      where: {
        userId,
        token: refreshToken,
      },
    });
    if (!record)
      throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    await record.destroy();
    return true;
  }

  async refreshToken({ userId, refreshToken }) {
    const record = await db.Token.findOne({
      where: {
        userId,
        token: refreshToken,
        type: TOKEN_TYPE.REFRESH_TOKEN,
      },
    });
    if (!record)
      throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    const dataToken = record.get({ plain: true });
    const isExpired = new Date(dataToken.expiredAt).getTime() < Date.now();
    if (isExpired) {
      await record.destroy();
      throw new AppError(AUTH_MESSAGES.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const [newAccessToken, newRefreshToken] = await Promise.all([
      generateToken({
        payload: { userId },
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      }),
      generateToken({
        payload: { userId },
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);
    await record.destroy();
    await db.Token.create({
      userId,
      token: newRefreshToken.token,
      type: TOKEN_TYPE.REFRESH_TOKEN,
      expiredAt: new Date(newRefreshToken.expiredAt),
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
module.exports = new AuthServices();
