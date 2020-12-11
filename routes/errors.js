const router = require('express').Router();
const { NotFoundError } = require('../errors');

router.use('/', (req, res, next) => {
  const err = new NotFoundError("This URL doesn't exist. Error Code 00x00099");
  next(err);
});

module.exports = router;
