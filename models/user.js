const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../errors');
const {
  toLess,
  toLong,
  requiredField,
  notEmail,
  noWhiteSpace,
} = require('../utils/error-messages/validation-errors');
const { wrongData } = require('../utils/error-messages/authentication-errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, requiredField],
    minlength: [2, toLess],
    maxlength: [30, toLong],
  },

  email: {
    type: String,
    required: [true, requiredField],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} ${notEmail}`,
    },
  },

  password: {
    type: String,
    required: [true, requiredField],
    select: false,
    validate: {
      validator(password) {
        return /^\S+$/.test(password);
      },
      message: `${noWhiteSpace}`,
    },
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(wrongData);
      }
      // получаем объект пользователя, если почта и пароль подошли
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(wrongData);
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
