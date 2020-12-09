const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} is not valid email!`,
    },
  },

  password: {
    type: String,
    required: true,
    select: false, // не возвращаем хэш пароля
    validate: {
      validator(password) {
        return /^\S+$/.test(password);
      },
      message: 'White space is not allowed.',
    },
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password') // тут вернем хеш пароля
    .then((user) => {
    // не нашёлся — отклоняем промис
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      // получаем объект пользователя, если почта и пароль подошли
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
