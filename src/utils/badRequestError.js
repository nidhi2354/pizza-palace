const AppError = require("./appError");

class BadRequestError extends AppError {
  constructor(invalidParams) {
    const message = invalidParams.join("\n");
    super(`The request has the following invalid parameters:\n${message}`, 400);
  }
}

module.exports = BadRequestError;
