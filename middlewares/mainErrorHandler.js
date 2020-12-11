const mainErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Internal Server Error. Code 01x00000'
      : message,
  });
  next();
};

module.exports = mainErrorHandler;
