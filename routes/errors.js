const router = require('express').Router();
const { NotFoundError } = require('../errors');
const { urlNotExist} = require('../utils/error-messages/not-found-errors');

router.use('/', (req, res, next) => {
  const err = new NotFoundError(urlNotExist);
  next(err);
});

module.exports = router;
