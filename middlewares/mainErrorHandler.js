const { serverError } = require('../utils/error-messages/server-errors');

const mainErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? serverError
      : message,
  });
  next();
};

module.exports = mainErrorHandler;
