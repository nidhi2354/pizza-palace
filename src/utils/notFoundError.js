const AppError = require("./appError");

class NotFoundError extends AppError {
  constructor(resource) {
    //properties: []

    super(`Not able to find  : $ resources ${resource}`, 404);
  }
}

module.exports = NotFoundError;
