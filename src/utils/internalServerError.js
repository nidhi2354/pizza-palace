const AppError = require("./appError");

class InternalServerError extends AppError {
  constructor() {
    super(`It is not you  it's our server where something went wrong `, 500);
  }
}

module.exports = InternalServerError;
