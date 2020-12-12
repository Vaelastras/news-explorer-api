const mongoose = require('mongoose');
const validator = require('validator');
const { requiredField, notURL } = require('../utils/error-messages/validation-errors');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, requiredField],
  },

  title: {
    type: String,
    required: [true, requiredField],
  },

  text: {
    type: String,
    required: [true, requiredField],
  },

  date: {
    type: String,
    required: [true, requiredField],
  },

  source: {
    type: String,
    required: [true, requiredField],
  },

  link: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} ${notURL}`,
    },
  },

  image: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} ${notURL}`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, requiredField],
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);
