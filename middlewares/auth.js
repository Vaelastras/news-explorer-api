const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors');
const { authRequired } = require('../utils/error-messages/authentication-errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть и начинается с Bearer
  if (!authorization && !authorization.startsWith('Bearer ')) {
    throw new AuthError(authRequired);
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new AuthError(authRequired);
  }
  req.user = payload;

  next();
};
