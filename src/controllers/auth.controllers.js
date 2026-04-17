const AuthServices = require("../services/auth.services");
const STATUS_CODE = require("../constants/statusCode");

class AuthControllers {
  async signUp(req, res, next) {
    const { email, password, firstName, lastName } = req.body;
    const result = await AuthServices.signUp({
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
    const result = await AuthServices.signIn({
      email,
      password,
    });
    res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
}
module.exports = new AuthControllers();
