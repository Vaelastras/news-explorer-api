const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../errors');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// создание нового пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            User.create({
              name, email, password: hash,
            })
              .then((userData) => res.send({
                name: userData.name,
                email: userData.email,
              }));
          } else {
            throw new ConflictError('Email already exist');
          }
        })
        .catch(next);
    })
    .catch(next);
};

// вход в систему
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// получение себя
const getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('That user doesn\'t exist');
      }
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserInfo,
};
