const authServices = require("../services/auth.services");
const STATUS_CODE = require("../constants/statusCode");

class AuthControllers {
  async signUp(req, res, next) {
    const { email, password, firstName, lastName } = req.body;
    const result = await authServices.signUp({
      email,
      password,
      firstName,
      lastName,
    });
    res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }
  async signIn(req, res, next) {
    const { email, password } = req.body;
    const result = await authServices.signIn({
      email,
      password,
    });
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
  async forgotPassword(req, res, next) {
    const { email } = req.body;
    const result = await authServices.forgotPassword(email);
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
  async verifyForgotPasswordToken(req, res, next) {
    const { token } = req.query;
    const result = await authServices.verifyForgotPasswordToken(token);
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
  async resetPassword(req, res, next) {
    const { token, password } = req.body;
    const result = await authServices.resetPassword({ token, password });
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
  async sendVerifyAccount(req, res, next) {
    const { userId } = req.body;
    const result = await authServices.sendVerifyAccount(userId);
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
  async verifyAccount(req, res, next) {
    const { token } = req.query;
    const result = await authServices.verifyAccount(token);
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }

  async signOut(req, res, next) {
    const { userId } = req.user;
    const { refreshToken } = req.body;
    const result = await authServices.signOut({ userId, refreshToken });
    res.status(STATUS_CODE.OK).json({ data: result });
  }

  async refreshToken(req, res, next) {
    const { userId } = req.user;
    const { refreshToken } = req.body;
    const result = await authServices.refreshToken({ userId, refreshToken });
    res.status(STATUS_CODE.OK).json({ data: result });
  }
}
module.exports = new AuthControllers();
