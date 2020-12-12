const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const validatorLink = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('invalid URL');
  }
  return value;
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Please type a correct Email')
      .messages({
        'any.required': 'Email is required for usage',
      }),
    password: Joi.string().required().pattern(/^\S+$/)
      .message('White space is not allowed in password field')
      .messages({
        'any.required': 'Password field is required for usage',
      }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Please type a correct Email')
      .messages({
        'any.required': 'Email is required for usage',
      }),
    password: Joi.string().required().pattern(/^\S+$/)
      .message('White space is not allowed in password field')
      .messages({
        'any.required': 'Password field is required for usage',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Name field is required for usage',
        'string.min': 'Name field should be more than 2 symbols',
        'string.max': 'Name field should be less than 20 symbols',
      }),
  }),
});

const validateArticleDelete = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex(),
  }),
});

const validateArticleCreate = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'Keyword field is required for usage',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'Title field is required for usage',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'Text field is required for usage',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Date field is required for usage',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Source field is required for usage',
      }),
    link: Joi.string().required().custom(validatorLink)
      .messages({
        'any.required': 'Link field is required for usage',
      }),
    image: Joi.string().required().custom(validatorLink)
      .messages({
        'any.required': 'Image field is required for usage',
      }),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateArticleDelete,
  validateArticleCreate,
};
